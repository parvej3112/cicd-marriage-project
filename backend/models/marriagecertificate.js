'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MarriageCertificate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MarriageCertificate.belongsTo(models.Admin, {
        foreignKey: 'adminId',
        as: 'admin'
      });
      MarriageCertificate.belongsTo(models.Office, { foreignKey: 'officeId' });
    }
  }
  MarriageCertificate.init({
    groomName: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    groomFathersName: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    groomAge:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    groomOccupation:{
      type:DataTypes.STRING,
      allowNull:false
    },
    groomReligion:{
      type:DataTypes.STRING,
      allowNull:false
    },
    groomAddress:{
      type:DataTypes.STRING,
      allowNull:false
    },
    brideName:{
      type:DataTypes.STRING,
      allowNull:false
    },
    brideFathersName: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    brideAge:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    brideOccupation:{
      type:DataTypes.STRING,
      allowNull:false
    },
    brideReligion:{
      type:DataTypes.STRING,
      allowNull:false
    },
    brideAddress:{
      type:DataTypes.STRING,
      allowNull:false
    },
    marriageDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    maherAmount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
     maherWord: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Vakil:{
      type:DataTypes.STRING,
      allowNull:false
    },
    witness1:{
      type:DataTypes.STRING,
      allowNull:false
    },
    witness2:{
      type:DataTypes.STRING,
      allowNull:false
    },
    marriagePerformer:{
      type:DataTypes.STRING,
      allowNull:false
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Admins',
        key: 'id'
      }
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
    modelName: 'MarriageCertificate',
  });
  return MarriageCertificate;
};