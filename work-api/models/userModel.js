const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
   username: {type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    parties: [
        {
            partyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Party' }
        }
    ],
});


module.exports = mongoose.model('User', userSchema);