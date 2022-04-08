const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    user_name:  String,
    user_mail: String,
    user_password:   String,
    user_nft: Array,
    user_wallet: String,
  });

const Users = mongoose.model('User', usersSchema)

module.exports = Users