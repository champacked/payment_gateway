const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Payment = sequelize.define("Payment", {
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  currency: { type: DataTypes.STRING(3), allowNull: false },
  payment_method: { type: DataTypes.STRING(50), allowNull: false },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: "pending",
  },
});

User.hasMany(Payment);
Payment.belongsTo(User);

module.exports = Payment;
