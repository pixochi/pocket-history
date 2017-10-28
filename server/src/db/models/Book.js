module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    // id of a book from Google Books API
    id: { 
      type: DataTypes.STRING, 
      primaryKey: true,
      allowNull: false
    },

    title: DataTypes.STRING,
  }, 
    { updatedAt: false }
  );

   Book.associate = (models) => {
    Book.belongsTo(models.User);
  }

  return Book;
};