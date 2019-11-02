const User = require('../models/userModel');
const errorHandler = require('../helpers/errorHandler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = {
    async SignupUser(req, res){
        const candidate = await User.findOne({email: req.body.email});
        const candidateUsername = await User.findOne({username: req.body.username})
        if(candidate){
            res.status(409).json({
                message: 'Такой email уже занят'
            })
        }
        else if(candidateUsername){
            res.status(409).json({
                message: 'Такой ник уже занят'
            })
        }else {
            const salt = bcrypt.genSaltSync(10)
            const password = req.body.password
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(password, salt)
            })
            try{
                await user.save()
                res.status(201).json(user)
            }catch (e) {
                errorHandler(res, e)
            }

        }
    },
    async LoginUser(req, res){
        if (!req.body.username || !req.body.password) {
            return res
                .status(500)
                .json({ message: 'No empty fields allowed' });
        }
        const candidate = await User.findOne({username: req.body.username})
        if(candidate){
            const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
            if(passwordResult){
                const token = jwt.sign({
                    username: candidate.username,
                    _id: candidate._id
                }, keys.jwt, {expiresIn: '1d'})
                res.status(200).json({
                    token: `Bearer ${token}`,
                    message: 'Вы можете зайти в систему'
                })
            }else{
                res.status(401).json({
                    message: "Пароли не совпадают. Попробуйте снова."
                })
            }
        }else{
            res.status(404).json({
                message: "Пользователь с таким ником не найден"
            })
        }
    },
  async GetUser(req, res){
      try {
          const user = await User.findById(req.user._id).select("-password");
          res.status(200).json( user );
      } catch (e) {
          errorHandler(res, e)
      }
  }
}