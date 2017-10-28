module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    // id of a video from Youtube API
    id: { 
      type: DataTypes.STRING, 
      primaryKey: true,
      allowNull: false
    },

    title: DataTypes.STRING,
  }, 
    { updatedAt: false }
  );

   Video.associate = (models) => {
    Video.belongsTo(models.User);
  }

  return Video;
};