const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nftSchema = new Schema({
    nft_hash: String,
    nft_id: Number,
    nft_accesory_list: Array,
    nft_level: Number,
    nft_owner: String,
    nft_attack: Array,
    nft_price: Number,
    nft_type: String,
    nft_bg_color: String,
    nft_forsale: Boolean,
    nft_potential: Number,
  });

const nft = mongoose.model('nft', nftSchema)

module.exports = nft