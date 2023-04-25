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


//미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
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
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
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
        const ext = path.extname(file.originalname);
        const filename = path.basename(file.originalname, ext);
        cb(null, encodeURIComponent(filename) + '-' + Date.now() + ext);
    },
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10, // 10MB
    },
});



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
                            username: req.body.username,
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
                        username: user.username,
                        email: user.email,
                        userId: user._id,
                    };
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    })
                }
            })
        })
})
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'User logged out' });
})
app.post('/posts', upload.single('images'), (req, res) => {

    console.log(req.file);

    const post = new Post({
        is_notice: req.body.is_notice,
        title: req.body.title,
        font: req.body.font,
        size: req.body.size,
        content: req.body.content,
        images: req.file.filename,
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