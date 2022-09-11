/* eslint-disable */
const User = require('../models/user')

const createUser = (req, res) => {
  const{name, about, avatar} = req.body;
  User.create ({name, about, avatar})
  .then((user) => {
    res.status(200).send(user);
  })
  .catch((error) => {
    if (error.name === "ValidatorError"){
      return res.status(400).send({ message: "Переданы не корректные данные" })
  }
    else {res.status(500).send({ message: error })};
  });
};

const getUsersById = (req, res) => {
  User.findById(req.params.id)
  .then((user) => {
    res.status(200).send(user);
  })
  .catch((error) => {
    if (error.name === "ValidatorError"){
      return res.status(404).send({ message: "Переданы не корректные данные" })
  }
    else {res.status(500).send({ message: error })}
  });
      }

const updateProfile = (req, res) => {
    const { name, about } = req.body;

    User.findByIdAndUpdate (req.user._id, {name, about})

  .then((user) => {
    res.status(200).send(user);
  })
  .catch((error) => {
    if (error.name === "ValidatorError"){
      return res.status(404).send({ message: "" })
  }
    else {res.status(500).send({ message: error })};
  });
};

const patchMeAvatar  = (req, res) => {
      const {  avatar } = req.body;
      User.findByIdAndUpdate(req.user._id, {avatar})
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((error) => {
        if (error.name === "ValidatorError"){
          return res.status(404).send({ message: " " })
      }
       else{ res.status(500).send({ message: error })};
      });
          }

const getUsers = (req, res) => {
        User.find({})
        .then((users) => {
          res.status(200).send(users);
        })
        .catch((error) => {
          if (error.name === "ValidatorError"){
            return res.status(404).send({ message: " " })
        }
          else {res.status(500).send({ message: error })};
        });
        }

module.exports = {createUser, getUsersById, getUsers, updateProfile, patchMeAvatar}
