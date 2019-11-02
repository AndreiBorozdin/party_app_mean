const errorHandler = require('../helpers/errorHandler');
const Party = require('../models/partyModel');
const User = require('../models/userModel');
module.exports = {
    async GetAllParty(req, res){
      try {
        const parties = await Party.find({}).populate("user", "-password").sort({ created: -1 });
          return res
              .status(200)
              .json({parties});
      }catch(e){
       errorHandler(res, e)
      }
    },

    async GetParty(req, res) {
        try{
          const party  = await Party.findById(req.params.id).populate("user", "-password").populate({path: 'participants', model: 'User'});
        //const partyOne  = await Party.findById(req.params.id);
         res.status(200).json({party});
        }catch (e) {
            errorHandler(res, e)
        }
    },
  async addParty(req, res) {
      const party = new Party ({
          user: req.user._id,
          title: req.body.title,
          city: req.body.city,
          description: req.body.description,
          created: new Date()
      });
      try{
          party.save();
          await User.update(
              {
                  _id: req.user._id
              },
              {
                  $push: {
                      parties: {
                          partyId: party._id,
                          created: new Date()
                      }
                  }
              }
          );
          res.status(200).json({message: 'Party created', party});
      }catch (e) {
          errorHandler(res, e)
          res.status(500).json({message: 'Error occured'})
      }
  },
  async EditParty(req, res){
    const updated = {
        title: req.body.title,
        city: req.body.city,
        description: req.body.description,
        created: new Date()
    }
    try{
      const party = await Party.findOneAndUpdate({_id: req.params.id}, {$set: updated}, {new: true})
        res.status(200).json(party);
    }catch (e) {
        errorHandler(res, e)
    }
  },
  async DeleteParty(req, res){
      const { id } = req.params;
      const result = await Party.findByIdAndRemove(id);
  try{
     if(!result){
         return res
             .status(404)
             .json({ message: 'Could not find party' });
     }else {
         await User.update(
             {
                 _id: req.user._id
             },
             {
                 $pull: {
                     parties: {
                         partyId: result._id
                     }
                 }
             }
         );
         return res
             .status(200)
             .json({ message: 'Party deleted successfully' });
     }
  }catch (e) {
      errorHandler(res, e)
  }
  }

}
/*

*/