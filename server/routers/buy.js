const NFT = require('../../models/collectibles.model')

const buyToken = (req, res) => {
    const { _id , address} = req.body;
    console.log(_id, address)
    // transfering the ownership
    NFT.findOneAndUpdate({_id}, {$set:{address:address}}, function(err,tokens) {
        if (err) return err;
        res.send({
            "success":true,
            "message":"Baught successful"
        })
        res.end()
    })
}

module.exports = buyToken;