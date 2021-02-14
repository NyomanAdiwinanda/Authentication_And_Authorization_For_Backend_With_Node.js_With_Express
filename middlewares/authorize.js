const { Task } = require('../models')

const authorize = async (req, res, next) => {
  try {
    const { id } = req.params
    const UserId = req.decoded.id
    
    const data = await Task.findOne({
      where: { id }
    })

    if(!data) throw ({
      status: 404,
      errors: "id not found"
    })

    if(data.UserId !== UserId) throw {
      status: 401,
      errors: "not authorized"
    }

    next()
  }
  catch (err) {
    if (err.status === 404) {
      res.status(404).json(err)
    } else if (err.status === 401) {
      res.status(401).json(err)
    } else {
      res.status(500).json({ errors: 'Internal Server Error' })
    }
  }
}

module.exports = authorize