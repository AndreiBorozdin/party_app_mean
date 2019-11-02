const mongoose = require('mongoose');


const partySchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true},
    city: {type: String, required: true},
    description: {type: String, required: true, max: [128, 'Too long, max 128 characters']},
    startDate: {type: Date},
    endDate: {type: Date},
    participants: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ],
    created: { type: Date, default: Date.now() }
});



module.exports = mongoose.model('Party', partySchema);