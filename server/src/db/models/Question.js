module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id: { 
      type: DataTypes.UUID, 
      primaryKey: true, 
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    // used for the question of the day
    date: { 
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },

    content: DataTypes.TEXT
  }, 
    { updatedAt: false }
  );

   Question.associate = (models) => {
    Question.hasMany(models.Answer, { onDelete: 'cascade' });
  }

  return Question;
};