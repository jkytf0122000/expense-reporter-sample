"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
class Expense extends sequelize_1.Model {
}
exports.Expense = Expense;
Expense.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user_name: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false,
        defaultValue: ''
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    type: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
    },
    amount: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: 'expenses',
    underscored: true,
    sequelize: sequelize
});
