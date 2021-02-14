'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const { hashPass } = require('../helpers/bcryptjs.js')
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.ModelName, { // Change ModelName with your own sequelize model
        foreignKey: 'UserId',
        sourceKey: 'id'
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid Email Format"
        }
      }
    }, 
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};