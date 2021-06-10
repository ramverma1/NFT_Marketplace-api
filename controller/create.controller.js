const NFT = require('../models/collectibles.model')

const create = async ( req, res ) => {

    const { hash, name, description, address, token_id, price } = req.body;

    const getnft = await getNFT(hash)

    if (getnft) {
        res.send(existingNFT(hash))
        res.end()
    } else {
        res.send(createNewNFT(hash, name, description, req.file.path, address, token_id, price))
    }

}

/**
 * Get a document detail using _id
 */
async function getNFT(_id) {

    return new Promise((resolve, reject) => {
        try {
            NFT.findOne({ _id }, function (err, Collectible) {
                if (err) resolve(false);
                resolve(Collectible);
            })
        } catch (error) {
            resolve('[]')
        }
    })
}

const createNewNFT = ( _id, token_name, description, file, address, token_id, price ) => {
    return new Promise((resolve, reject) => {
        try {
            let nft = new NFT(
                {
                    _id: _id,
                    token_name,
                    description,
                    image: file,
                    address,
                    token_id,
                    price
                }
            );
        
            nft.save(function (err) {
                if (err) {
                    return err;
                }
                return resolve()
            })
        } catch (error) {
            resolve('[]')
        }
    })
}

/**
 * Reply body if NFT already available.
 */
function existingNFT (_id) {
    return {
        'success': false,
        'reason': 'existing',
        '_id': _id
    }
}

module.exports = create 