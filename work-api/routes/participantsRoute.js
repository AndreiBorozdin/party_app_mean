const express = require('express');
const router = express.Router();
const passport = require('passport');
const participantCtrl = require('../controllers/participantsCtrl');

router.post('/party/:id', passport.authenticate('jwt', {session: false}), participantCtrl.addParticipants);
//router.get('/party/:id/party-list', passport.authenticate('jwt', {session: false}), participantCtrl.getParticipant);

router.delete('/party/:id/:userId', passport.authenticate('jwt', {session: false}), participantCtrl.deleteParticipant);

module.exports = router;