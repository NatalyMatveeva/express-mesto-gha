/* eslint-disable */
const user = require('../models/user');
const User = require('../models/user')

const createUser = (req, res) => {
  const{name, about, avatar} = req.body;
  User.create ({name, about, avatar})
  .then((user) => {
    res.status(200).send({data: user});
  })
  .catch((error) => {
    if (error.name = "ValidatorError"){
      return res.status(400).send({ message: "Переданы не корректные данные" })
  }
    else {res.status(500).send({ message: error })};
  });
};

const getUsersById = (req, res) => {
  User.findById(req.params.userId)
  .then( (user) => {
      if (!user)  res.status(404).send({ message: "Такой пользователь не существует" })
   res.status(200).send({data: user});
    })

  .catch((error) => {
    if (error.name = "ValidatorError"){
      return res.status(400).send({ message: "Переданы некорректные данные" })
  }
    else {res.status(500).send({ message: error })}
  });
      }

const updateProfile = (req, res) => {
      User.findByIdAndUpdate (req.user._id, {name: req.body.name, about: req.body.about}, { runValidators: true, new:true})
      .then((user) => {
        if (!user){
           res.status(404).send({ message: "Пользователь с указанным _id не найден" })
        }
        res.status(200).send({data:user});
      })
      .catch((error) => {
        if (error.name = "ValidatorError"){
          res.status(400).send({ message: "Переданы некорректные данные " })
      }
        else {
          res.status(500).send({ message: error })
        };
      });
      }

const patchMeAvatar  = (req, res) => {
      const {  avatar } = req.body;
      User.findByIdAndUpdate(req.user._id, {avatar}, { runValidators: true, new:true})
      .then((user) => {
        res.status(200).send({data: user});
      })
      .catch((error) => {
        if (error.name = "ValidatorError"){
          res.status(400).send({ message: "Переданы некорректные данные " })
      }
        else {
          res.status(500).send({ message: error })
        };
      });
      }

const getUsers = (req, res) => {
        User.find({})
        .then((user) => {
          res.status(200).send({data: user});
        })
        .catch((error) => {
          if (error.name ="ValidatorError"){
            return res.status(400).send({ message: "Переданы некорректные данные " })
        }
          else {res.status(500).send({ message: error })};
        });
        }

module.exports = {createUser, getUsersById, getUsers, updateProfile, patchMeAvatar}
