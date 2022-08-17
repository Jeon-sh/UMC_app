const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        username: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true,
        },
        email: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: false, // true 설정 시  createdAt, updatedAt 자동 입력
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {}
}

module.exports = User;
