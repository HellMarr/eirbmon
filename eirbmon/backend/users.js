const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    user_name:  String,
    user_mail: String,
    user_password:   String,
  });

const Users = mongoose.model('User', usersSchema)

module.exports = Users