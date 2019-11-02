const express = require('express');
const router = express.Router();
const passport = require('passport');
const PartyCtrl = require('../controllers/partyCtrl');

router.get('/party', passport.authenticate('jwt', {session: false}), PartyCtrl.GetAllParty);
router.get('/party/:id', passport.authenticate('jwt', {session: false}), PartyCtrl.GetParty);
router.post('/add-party', passport.authenticate('jwt', {session: false}), PartyCtrl.addParty);
router.put('/party/:id', passport.authenticate('jwt', {session: false}),  PartyCtrl.EditParty);
router.delete('/delete-party/:id',passport.authenticate('jwt', {session: false}), PartyCtrl.DeleteParty);

module.exports = router;

//passport.authenticate('jwt', {session: false}),