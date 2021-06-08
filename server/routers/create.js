const createController = require('../../controller/create.controller')

const create = (req, res) => {
    const createToken = createController(req, res)
}

module.exports = create;