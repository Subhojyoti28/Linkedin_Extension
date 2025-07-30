'use strict';
module.exports = (sequelize, DataTypes) => {
  const LinkedInProfile = sequelize.define('LinkedInProfile', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    about: DataTypes.TEXT,
    bio: DataTypes.TEXT,
    location: DataTypes.STRING,
    followerCount: DataTypes.INTEGER,
    connectionCount: DataTypes.INTEGER
  }, {});
  return LinkedInProfile;
};