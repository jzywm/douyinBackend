const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    tel: { type: String, required: true },
    password: { type: String, required: true },
    Image: { type: String, default: '' },
    createAT: { type: Date, default: Date.now },
    updateAT: { type: Date, default: Date.now }
})

module.exports = userSchema;