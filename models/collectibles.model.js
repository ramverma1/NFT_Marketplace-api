const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let createCollectibles = new Schema({
    _id: {
        type: String,
    },
    token_name: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    address: {
        type: String,
    },

});

module.exports = mongoose.model('W-NFT', createCollectibles);