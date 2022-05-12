const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nftSchema = new Schema({
    nft_hash: String,
    nft_id: Number,
    nft_accessory_list: Array,
    nft_level: Number,
    nft_owner: String,
    nft_attack: Array,
    nft_price: Object,
    nft_type: String,
    nft_bg_color: String,
    nft_pedicel_color: String,
    nft_wings_color: String,
    nft_forsale: Boolean,
    nft_potential: Number,
    nft_image: String,
    nft_level: String,
    nft_hp: String,
  });

const nft = mongoose.model('nft', nftSchema, "nft");

module.exports = nft;