const mongoose = require('mongoose');
const userSchema = require('./userModel'); 

// 直接注册模型
const User = mongoose.model('User', userSchema);
const Video = mongoose.model('Video', require('./vedioModel'));

module.exports = { User, Video };