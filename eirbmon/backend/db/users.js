const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    user_name:  String,
    user_mail: String,
    user_password:   String,
    user_nft: Array,
    user_wallet: String,
    tokenIds: Array,
  });

const Users = mongoose.model('User', usersSchema, "users");

module.exports = Users;