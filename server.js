//모듈
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

//미들웨어 함수
const checkAdmin = require('./src/middleware/checkAdmin');


const app = express();

mongoose.Promise = global.Promise;
const User = require('./models/User');
const Post = require('./models/Post');
const Marker = require('./models/Marker');
const Admin = require('./models/Admin');
const Email = require('./models/Email');


//서버 실행
const port = process.env.PORT || 8484;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//MongoDB 연결
mongoose.connect('mongodb+srv://bilvin0709:nalkeok02@cluster0.y2yd1ip.mongodb.net/paju-sd', { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err => console.log(err)));




//미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://182.209.228.24:7000',
    credentials: true
}));
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //     httpOnly: true,
    //     secure: false, // https 인 경우 true로 변경
    //     maxAge: 60 * 60 * 1000 // 쿠키 유효 시간 1시간
    // }
}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://182.209.228.24:7000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

//multer관련 미들웨어
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname);
        // const filename = uniqueSuffix + '.' + ext;
        const filename = uniqueSuffix + ext;
        cb(null, filename);
    },
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 30, // 30MB
    },
});
app.use('/uploads', express.static('uploads'));



//각종 함수
const getNotice = async () => {
    const posts = await Post.find({ is_notice: true }).sort({ date: -1 }).limit(6)
    return posts
}






//라우팅 설정
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/user', (req, res) => {
    const { user } = req.session;
    res.json({ user });
});

app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.send(posts);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.json(post);
});

app.get('/is-notice', async (req, res) => {
    const noticePosts = await getNotice()
    res.json(noticePosts);
})

app.post('/signup', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                // console.log('email already exsists');
                return res.status(409).json({
                    message: 'Email already exsists'
                });

            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log('pw security error');
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            userName: req.body.userName,
                            nickName: req.body.nickName,
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    // const token = jwt.sign(
                    //     {
                    //         email: user.email,
                    //         userId: user._id
                    //     },
                    //     'secret',
                    //     {
                    //         expiresIn: '1h'
                    //     }
                    // );
                    req.session.user = {
                        userName: user.userName,
                        nickName: user.nickName,
                        email: user.email,
                        userId: user._id,
                    };
                    console.log("세션 저장 정보는??:", req.session.user)
                    return res.status(200).json({
                        message: 'Auth successful',
                        // token: token
                    })
                }
            })
        })
})
app.get('/logout', (req, res) => {
    console.log('세션 삭제 전 정보는?', req.session)
    req.session.destroy((err) => {
        if (err) {
            console.log('세션 삭제 오류', err);
        } else {
            console.log('세션 삭제 완료');
            console.log('세션 삭제 완류 후 정보는?', req.session);
            res.clearCookie('connect.sid'); // 세션 쿠키 삭제
            res.status(200).json({ message: 'User logged out' });
        }
    });
})
app.post('/posts', upload.single('images'), (req, res) => {

    // console.log(req.body);

    const post = new Post({
        is_notice: req.body.is_notice,
        title: req.body.title,
        font: req.body.font,
        size: req.body.size,
        content: req.body.content,
        images: req.file ? req.file.filename : '',
    })

    post.save()
        .then((savedPost) => {
            res.status(200).json({
                success: true,
                message: '게시물이 성공적으로 작성되었습니다.',
                post: savedPost,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: '게시물 작성에 실패했습니다.',
                error: error,
            });
            console.log('작성 실패...');
        });

});

app.post('/addmarker', upload.array('image', 4), (req, res) => {
    // console.log(req.body);
    const marker = new Marker({
        markerName: req.body.name,
        xCoordinate: req.body.xCoordinate,
        yCoordinate: req.body.yCoordinate,
        loca: req.body.loca,
        content: req.body.content,
        // images: req.file ? req.file.filename : '',
        //한 장만 올릴 때
        images: req.files.map((file) => file.filename),
        category1: req.body.category1,
        category2: req.body.category2,
        category3: req.body.category3,
        poster: req.body.poster
    })
    marker.save()
        .then((savedMarker) => {
            res.status(200).json({
                success: true,
                message: '마커 정보가 성공적으로 저장되었습니다.',
                markerInfo: savedMarker,
            });
            console.log('마커 정보 저장 성공!');
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: '마커 정보 저장에 실패했습니다.',
                error: err,
            })
            console.log('마커 정보 저장 실패...', err);
        })
})

app.get('/loadmarker', async (req, res) => {
    try {
        const markers = await Marker.find();
        res.send(markers);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

app.post('/admin-login', async (req, res) => {

    try {
        const admin = await Admin.findOne({ email: req.body.email })

        if (!admin) {
            return res.status(401).json({ message: 'Auth failed' })
        }


        if (admin.password !== req.body.password) {
            return res.status(401).json({ message: 'Auth failed' });
        }


        const token = jwt.sign(
            {
                email: admin.email,
                password: admin.password,
                sndPassword: admin.sndPassword,
            },
            'secret',
            {
                expiresIn: '10h'
            }
        );
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }

})
app.post('/admin-change-password', async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.tkEmail })

        if (!admin) {
            return res.status(401).json({ message: 'Auth failed' })
        }
        if (admin.password) {
            admin.password = req.body.changePW;
            await admin.save();
            return res.status(200).json({ message: 'change success' })
        }
    } catch (err) {
        console.log('error : ', err)
        return res.status(500).json({ message: 'Internal server error' })
    }
})
app.post('/admin-change-2ndpassword', async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.tkEmail })

        if (!admin) {
            return res.status(401).json({ message: 'Auth failed' })
        }
        if (admin.sndPassword) {
            admin.sndPassword = req.body.changePW;
            await admin.save();
            return res.status(200).json({ message: 'change success' })
        }
    } catch (err) {
        console.log('error : ', err)
        return res.status(500).json({ message: 'Internal server error' })
    }
})
//운영자 목록 조회 API
app.get('/admin-getManager', async (req, res) => {
    try {
        const managers = await User.find({ manager: 1 });
        res.json(managers);
    } catch (err) {
        console.log('Error fetching managers', err)
        res.status(500).json({ message: "Error fetching managers" });
    }
})
//운영자 추가 API
app.post('/admin-addManager', async (req, res) => {
    const { managerEmail, setManagerDate } = req.body;

    try {
        const addManager = await User.findOneAndUpdate(
            { email: managerEmail },
            { manager: 1, setManagerDate: new Date() },
            { new: true }
        )

        if (!addManager) {
            res.status(404).json({ error: 'User not found' })
        } else {
            res.json({ success: true, manager: addManager })
        }
    } catch (err) {
        console.log('Error add manager', err);
        res.status(500).json({ error: 'Error add manager' });
    }
})
//운영자 해제 API
app.post('/admin-delManager/:managerEmail', async (req, res) => {
    const { managerEmail } = req.body;

    try {
        const delManager = await User.findOneAndUpdate(
            { email: managerEmail },
            { manager: 0 },
            { new: true }
        );

        if (!delManager) {
            res.status(404).json({ error: 'User not found or not an admin' });
        } else {
            res.json({ success: true });
        }
    } catch (err) {
        console.log('Error delete manager', err);
        res.status(500).json({ error: 'error delete manager' })
    }
})