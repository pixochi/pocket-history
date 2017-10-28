module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    id: { 
      type: DataTypes.UUID, 
      primaryKey: true, 
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    content: DataTypes.STRING
  }, { updatedAt: false });

   Answer.associate = (models) => {
    Answer.belongsTo(models.User);
    Answer.belongsTo(models.Question);
  }

  return Answer;
};