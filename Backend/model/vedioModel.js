const mongoose = require('mongoose');
const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    url: { type: String, required: true },

    createAT: { type: Date, default: Date.now },
    updateAT: { type: Date, default: Date.now }
})
module.exports = videoSchema;