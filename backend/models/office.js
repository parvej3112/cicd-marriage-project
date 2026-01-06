'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Office extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Office.hasMany(models.Admin, { foreignKey: 'officeId' });
      models.Office.hasMany(models.MarriageCertificate, { foreignKey: 'OfficeId' });
    }
  }
  Office.init({
    officeId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    officeName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Office', // PascalCase here
    tableName: 'Offices', // Explicit table name to match User reference
    timestamps: true,
    id: false // disables Sequelize's default id
  });

  Office.addHook('beforeValidate', async (office, options) => {
    if (!office.officeId) {
      const lastOffice = await Office.findOne({ order: [['createdAt', 'DESC']] });
  
      let nextId = 1;
      if (lastOffice && lastOffice.officeId) {
        const num = parseInt(lastOffice.officeId.replace('AIZTSMP', ''), 10);
        if (!isNaN(num)) nextId = num + 1;
      }
  
      const paddedId = String(nextId).padStart(3, '0');
      office.officeId = `AIZTSMP${paddedId}`;
    }
  });
  return Office;
};