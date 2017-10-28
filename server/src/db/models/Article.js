module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    id: { 
      type: DataTypes.UUID, 
      primaryKey: true, 
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },

    title: DataTypes.STRING,

    link: DataTypes.STRING,
  }, 
    { updatedAt: false }
  );

   Article.associate = (models) => {
    Article.belongsTo(models.User);
  }

  return Article;
};