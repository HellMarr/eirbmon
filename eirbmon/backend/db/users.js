const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    user_name:  String,
    user_wallet:String,
    user_x: String,
    user_y: String,
  });

const Users = mongoose.model('User', usersSchema, "users");

module.exports = Users;