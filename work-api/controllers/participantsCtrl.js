const errorHandler = require('../helpers/errorHandler');
const Participant = require('../models/participantModel');
const Party = require('../models/partyModel');
const User = require('../models/userModel')

module.exports = {

async addParticipants(req, res){
    try{
      /*const participant = await new Participant({
            ...req.body,
            author: req.user.id,
           username: req.user.username
        }).save();
        const party = await Party.findById(req.params.id);
        //party.participants = [...party.participants, participant];
        party.participants.push(participant);
        party.save();
        await participant.populate("author").execPopulate();
        res.status(200).json({party});*/
            const party = await Party.findById(req.params.id).populate('participants');
            const user = await User.findById(req.user._id);
            party.participants.push(user);
            party.save();
            return res.status(200).json(party);
    }catch (e) {
        errorHandler(res, e)
    }
},
    /*async getParticipant(req, res){
    try{
        const party = await Party.findById(req.params.id);
        const participants = party.participants;
        return res.status(200).send({participants});
    }catch (e) {
        errorHandler(res, e)
    }

    },*/
    async deleteParticipant(req, res){
    const userId = req.params._id;
    const party = Party.findById(req.params.id).populate('participants');

    //party.participants.remove({_id: userId});
        party.participants = party.participants.filter(
            participant => participant._id !== userId
        );
    await party.save();

    return res.status(200).json(party);

}
}