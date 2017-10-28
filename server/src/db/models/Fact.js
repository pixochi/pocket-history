module.exports = (sequelize, DataTypes) => {
  const Fact = sequelize.define('Fact', {
    id: { 
      type: DataTypes.UUID, 
      primaryKey: true, 
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },

    year: {
      type: DataTypes.STRING,
      allowNull: false
    },

    html: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, { updatedAt: false });

  Fact.associate = (models) => {
    Fact.belongsTo(models.User);
  }

  return Fact;
};