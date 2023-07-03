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
    sndPassword: {
        type: String,
        required: false,
    },
    nickName: {
        type: String,
        required: false,
        unique: true,
    },
    birth: {
        type: Date,
        required: false,
    },
    gender: {
        type: Number,
        required: false,
    },
    phone: {
        type: Number,
        required: false,
    },
    grade: {
        type: Number,
        required: false,
    },
    manager: {
        type: Number,
        default: 0,
    },
    signupDate: {
        type: Date,
        required: false,
        default: Date.now
    },
    withdrawDate: {
        type: Date,
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
        type: Number,
        required: false,
    },
    banCount: {
        type: Number,
        required: false,
    },
    banStart: {
        type: Date,
        required: false,
    },
    banEnd: {
        type: Date,
        required: false,
    },
    forcedOutDate: {
        type: Date,
    },
    level: {
        type: Number,
    },
    point: {
        type: Number,
    },
    requiredPoint: {
        type: Number,
    },
    accessCount: {
        type: Number,
    },
    postCount: {
        type: Number,
    },
    commentCount: {
        type: Number,
    },
    likes: {
        type: Number,
    },
    // 최종방문일
    lastVisit: {
        type: Date
    },
    setManagerDate: {
        type: Date,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;





// grage는 회원등급 -> 0은 일반회원 / 1은 정회원
// gender는 0 남자 / 1 여자
// location 1 2 3 각각 [광역], [기초], [동네]
// applicationSubcmt 및 subcmt는 분과 관련 -> 0은 해당없음 / 1은 자연생태보전분과 / 2는 도시생활환경분과 / 3은 교육여성분과
// status는 회원 상태 -> 0은 정상 / 1은 탈퇴 / 2는 정지 / 3은 퇴출
// manager 디폴트값 0(운영자 아님) / 운영자는 6