const sequelize = require("../config/database.js");
const User = require("./users");
const db = {};

db.sequelize = sequelize;

db.User = User;

User.init(sequelize);

module.exports = db;
