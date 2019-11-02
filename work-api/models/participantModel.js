const mongoose = require('mongoose');


const participantSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    message: {type: String, required: true},
    createdAt: { type: Date, default: Date.now()}
})



module.exports = mongoose.model('participants', participantSchema);