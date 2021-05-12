const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type: String, required: true, index: {unique: true}
    },
    email: {
        type: String
    },
    phone: {
        type: String,
    },
    bio: {
        type: String
    },
    gender: {
        type: String,
    },
    password: {
        type: String
    },
    securityQuestion: {
        type: String,
    },
    securityAnswer: {
        type: String,
    },
    lastLoginTime: {
        type: Date
    },
    role: {
        type: String,   // admin, or user
        default: 'user'
    },
})

const SearchHistorySchema = mongoose.Schema({
    username: {
        type: String, required: true
    },
    search_query: {
        type: String
    },
    search_time:{
        type: Date
    }
})

const User = mongoose.model('User', UserSchema)
const SearchHistoryRecord = mongoose.model('SearchHistoryRecord', SearchHistorySchema)
module.exports = {User, SearchHistoryRecord}