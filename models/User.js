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
        type: String,
        required: false,
        unique: true,
    },
    birth: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    grade: {
        type: String,
        required: false,
    },
    signupTime: {
        type: String,
        required: false,
    },
    withdrawTime: {
        type: String,
        required: false,
    },
    location1: {
        type: String,
        required: false,
    },
    location2: {
        type: String,
        required: false,
    },
    location3: {
        type: String,
        required: false,
    },
    applicationSubcmt: {
        type: String,
        required: false,
    },
    subcmt: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    banCount: {
        type: String,
        required: false,
    },
    banStart: {
        type: String,
        required: false,
    },
    banEnd: {
        type: String,
        required: false,
    },
    
});

const User = mongoose.model('User', userSchema);

module.exports = User;