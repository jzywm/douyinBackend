const mongoose = require('mongoose');
const md5 = require('../utils/md5').md5;


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, },
    tel: { type: String, required: true, },
    password: { type: String, required: false, set: value => md5(value), select: false },
    Image: { type: String, default: '' },
    code: { type: String, default: '' },
    createAT: { type: Date, default: Date.now },
    updateAT: { type: Date, default: Date.now }
})

module.exports = userSchema;