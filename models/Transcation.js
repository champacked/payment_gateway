const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Payment = require("./Payment");

const Transaction = sequelize.define("Transaction", {
  payment_id: { type: DataTypes.INTEGER, allowNull: false },
  transaction_type: { type: DataTypes.STRING(20), allowNull: false },
  status: { type: DataTypes.STRING(20), allowNull: false },
  response: { type: DataTypes.TEXT },
});

Payment.hasMany(Transaction);
Transaction.belongsTo(Payment);

module.exports = Transaction;
