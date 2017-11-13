module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    id: { 
      type: DataTypes.UUID, 
      primaryKey: true, 
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },

    socialId: { type: DataTypes.STRING , unique: true },

    token: { type: DataTypes.STRING, unique: true, allowNull: false },

    provider: { type: DataTypes.STRING },

    firstName: { type: DataTypes.STRING, allowNull: false },

    lastName: { type: DataTypes.STRING, allowNull: false },

    email: {
     type: DataTypes.STRING,
     allowNull: false,
     unique: true, 
     set(val) {
      this.setDataValue('email', val.toString().toLowerCase());
     }
    },

    image: { type: DataTypes.STRING }

  }, {
    timestamps: true,
    updatedAt: false,
    paranoid: true
  });


  User.associate = (models) => {
    User.hasMany(models.Fact, { onDelete: 'cascade' });
    User.hasMany(models.Article, { onDelete: 'cascade' });
    User.hasMany(models.Book, { onDelete: 'cascade' });
    User.hasMany(models.Video, { onDelete: 'cascade' });
    User.hasMany(models.Answer, { onDelete: 'cascade' });
    User.hasMany(models.DiaryRecord, { onDelete: 'cascade' });
  }

  return User;
};
