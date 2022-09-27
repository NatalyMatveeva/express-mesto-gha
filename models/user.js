const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const BadRequest = require('../errors/badRequest');
const Unauthorized = require('../errors/unauthorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    required: false,
    minLength: 2,
    maxLength: 30,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new BadRequest({ message: 'Некорректный email' });
      }
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  about: {
    type: String,
    default: 'Исследователь',
    required: false,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://manrule.ru/images/article/orig/2020/10/kak-muzhchine-stat-modelyu-17.jpg',
    required: false,
    validate: {
      validator(value) {
        return /https?:\/\/(\w{3}\.)?[1-9a-z\-.]{1,}\w\w(\/[1-90a-z.,_@%&?+=~/-]{1,}\/?)?#?/i.test(value);
      },
    },
  },
});

userSchema.statics.findUserByCredentials = function findOne(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized('Необходима авторизация'));
      }
      return bcrypt.compare(password, user.password)

        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized('Необходима авторизация'));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
