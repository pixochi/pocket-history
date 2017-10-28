module.exports = (sequelize, DataTypes) => {
  const DiaryRecord = sequelize.define('DiaryRecord', {
    id: { 
      type: DataTypes.UUID, 
      primaryKey: true, 
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },

    date: { 
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },

    content: DataTypes.TEXT,
    keywords: DataTypes.ARRAY(DataTypes.STRING)
  }, 
    { updatedAt: false }
  );

   DiaryRecord.associate = (models) => {
    DiaryRecord.belongsTo(models.User);
  }

  return DiaryRecord;
};