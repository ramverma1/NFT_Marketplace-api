const NFT = require('../../models/collectibles.model')

const getAll = (req, res) => {
    NFT.find({}, function(err,tokens) {
        if (err) return err;
        res.send(tokens)
        res.end()
    })
}

const getMyToken = (req, res) => {
    const { address } = req.body;
    NFT.find({address}, function(err,tokens) {
        if (err) return err;
        res.send(tokens)
        res.end()
    })
}

module.exports = { getAll, getMyToken }