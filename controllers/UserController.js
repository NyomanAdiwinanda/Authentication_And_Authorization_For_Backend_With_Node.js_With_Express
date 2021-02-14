const { User } = require('../models')
const { comparePass } = require('../helpers/bcryptjs.js')
const { generateToken } = require('../helpers/jwt.js')

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body
      const newUser = {
        email,
        password
      }
      
      const data = await User.create(newUser)

      if(!data) throw ({
        name: "CustomError",
        msg: "Invalid Request",
        status: 400
      })

      res.status(201).json({
        msg: "register success",
        id: data.id,
        email: data.email
      })
    }
    catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      const data = await User.findOne({
        where: { email }
      })

      if(!data) throw ({
        name: "CustomError",
        msg: "Invalid Email or Password",
        status: 400
      })

      const comparePassword = await comparePass(password, data.password)

      if(!comparePassword) throw({
        name: "CustomError",
        msg: "Invalid Email or Password",
        status: 400
      })

      const accessToken = generateToken({
        id: data.id,
        email: data.email
      })

      res.status(200).json({ accessToken })
    }
    catch (err) {
      next(err)
    }
  }
}

module.exports = UserController