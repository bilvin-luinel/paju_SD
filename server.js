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

const app = express();

mongoose.Promise = global.Promise;
const User = require('./models/User');
const Post = require('./models/Post');


//서버 실행
const port = process.env.PORT || 8484;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//MongoDB 연결
mongoose.connect('mongodb://localhost/paju-sd', { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err => console.log(err)));

//기본 뉴스 게시판 데이터 (작업 일정 부분 진행 후 or 불필요해지면 코드 삭제할 것)
// const posts = [
//     {
//         is_notice: true,
//         title: '지구의날 자원순환축제',
//         font: 'Arial',
//         size: 'small',
//         content: '오지구게임',
//         images: ['1682486630048-422169868.jpg'],
//     },
//     {
//         is_notice: true,
//         title: '파주 운정호수공원 음악분수',
//         font: 'undefined',
//         size: 'undefined',
//         content: '5월부터 본격가동\r\n매일 주,야간 각 1회 운영',
//         images: ['1682475375464-765393074.png'],
//     },
//     {
//         is_notice: true,
//         title: '파주시 어린이책잔치 개최',
//         font: 'undefined',
//         size: 'undefined',
//         content: "'다양성과 다문화'를 주제로\r\n5월 5~7일 파주에서 개최된다",
//         images: ['1682475352668-867097223.png'],
//     },
//     {
//         is_notice: true,
//         title: '파주시 공공데이터 우수기관 선정',
//         font: 'undefined',
//         size: 'undefined',
//         content: '파주시 공공데이터 제공 운영실태\r\n평가에서 최고등급의 우수기관으로 선정',
//         images: ['1682475282031-29778111.png'],
//     },
//     {
//         is_notice: true,
//         title: '지구의 날 기념 다양한 행사진행',
//         font: 'undefined',
//         size: 'undefined',
//         content: '파주시는 지구의 날을 맞아\r\n탄소중립 생활 실천 챌린지를 진행한다',
//         images: ['1682475228248-322246147.png'],
//     },
//     {
//         is_notice: true,
//         title: '파주시, 동물학대와의 전쟁',
//         font: 'undefined',
//         size: 'undefined',
//         content: '경기도 특별사법경찰단이 육견\r\n농장 현장 적발하고 수사에 나섰다',
//         images: ['1682474931023-463574705.png'],
//     }
// ];
// Post.create(posts)
//   .then(() => console.log('saved'))
//   .catch((error) => console.error(error));


//미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:7000',
    credentials: true
}));
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false, // https 인 경우 true로 변경
        maxAge: 60 * 60 * 1000 // 쿠키 유효 시간 1시간
    }
}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:7000');
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
        fileSize: 1024 * 1024 * 10, // 10MB
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
    console.log(noticePosts);
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
                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId: user._id
                        },
                        'secret',
                        {
                            expiresIn: '1h'
                        }
                    );
                    req.session.user = {
                        userName: user.userName,
                        nickName: user.nickName,
                        email: user.email,
                        userId: user._id,
                    };
                    console.log("세션 저장 정보는??:", req.session.user)
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    })
                }
            })
        })
})
app.get('/session', (req, res) => {
    const sessionInfo = {
        userName: req.session.username,
        email: req.session.email,
        userId: req.session.userId
    }
    res.json(sessionInfo);
    // console.log(sessionInfo);
})
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'User logged out' });
})
app.post('/posts', upload.single('images'), (req, res) => {

    // console.log(req.file);

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