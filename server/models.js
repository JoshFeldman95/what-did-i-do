const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const ResponseSchema = {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

const UserSchema = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  googleid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

const Response = sequelize.define("Response", ResponseSchema);
const User = sequelize.define("User", UserSchema);

Response.hasOne(User);
User.hasMany(Response);

Response.sync();
User.sync();

module.exports = { Response, User };
