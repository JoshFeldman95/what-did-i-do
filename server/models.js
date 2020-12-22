const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
console.log(process.env.DATABASE_URL);
const sequelize = new Sequelize(process.env.DATABASE_URL);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

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

User.hasMany(Response, { foreignKey: "userId" });

Response.sync();
User.sync();

module.exports = { Response, User };
