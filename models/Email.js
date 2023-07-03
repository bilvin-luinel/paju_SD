const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    noticeReport: {
        type: String,
        required: false,
    },
    markerRegist: {
        type: String,
        required: false,
    },
    markerReport: {
        type: String,
        required: false,
    },
    fullMemberCertify: {
        type: String,
        required: false,
    },
    memberSend: {
        type: String,
        required: false,
    },
    objectionSend: {
        type: String,
        required: false,
    },

})

const Email = mongoose.model('Email', emailSchema)

module.exports = Email;