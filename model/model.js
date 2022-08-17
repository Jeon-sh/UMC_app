const sequelize = require("../config/database.js");
const User = require("./users");
const db = {};

db.sequelize = sequelize;

db.User = User;

User.init(sequelize);

User.associate(db);

module.exports = db;
