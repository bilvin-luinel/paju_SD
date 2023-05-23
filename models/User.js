const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    nickName: {

    },
    birth: {

    },
    gender: {

    },
    phone: {

    },
    grade: {

    },
    signupTime: {

    },
    withdrawTime: {

    },
    location1: {

    },
    location2: {

    },
    location3: {

    },
    applicationSubcmt: {

    },
    subcmt: {

    },
    status: {

    },
    banCount: {

    },
    banStart: {

    },
    banEnd: {

    },
    forcedOutDate: {

    },
    level: {

    },
    point: {

    },
    requiredPoint: {

    },
    accessCount: {

    },
    postCount: {

    },
    commentCount: {

    },
    likes: {
        
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;