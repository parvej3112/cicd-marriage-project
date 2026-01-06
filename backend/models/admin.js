'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.hasMany(models.MarriageCertificate, {
        foreignKey: 'adminId',
        as: 'certificates'
      });
      Admin.belongsTo(models.Office, { foreignKey: 'officeId' });
    }
  }
  Admin.init({
    name:{
      type: DataTypes.STRING,
      allowNull :false
    } ,
    email: {
      type: DataTypes.STRING,
      allowNull :false,
      unique:true,
    },
    phone:{
      type:DataTypes.STRING,
      allowNull:false
    },
    officeBranch:{
      type:DataTypes.STRING,
      allowNull: true,
      },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    officeId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Offices',
        key: 'officeId'
      }
    }

  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};