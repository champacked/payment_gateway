const express = require("express");
const router = express.Router();
const { Payment, Transaction } = require("../models");

router.post("/", async (req, res) => {
  const { user_id, amount, currency, payment_method } = req.body;
  const payment = await Payment.create({
    user_id,
    amount,
    currency,
    payment_method,
  });
  res.json(payment);
});

router.post("/:id/process", async (req, res) => {
  const payment = await Payment.findByPk(req.params.id);
  if (payment) {
    payment.status = "processed";
    await payment.save();
    const transaction = await Transaction.create({
      payment_id: payment.id,
      transaction_type: "payment",
      status: "success",
    });
    res.json({ payment, transaction });
  } else {
    res.status(404).json({ error: "Payment not found" });
  }
});

router.get("/:id", async (req, res) => {
  const payment = await Payment.findByPk(req.params.id);
  if (payment) {
    res.json(payment);
  } else {
    res.status(404).json({ error: "Payment not found" });
  }
});

router.post("/:id/refund", async (req, res) => {
  const payment = await Payment.findByPk(req.params.id);
  if (payment) {
    payment.status = "refunded";
    await payment.save();
    const transaction = await Transaction.create({
      payment_id: payment.id,
      transaction_type: "refund",
      status: "success",
    });
    res.json({ payment, transaction });
  } else {
    res.status(404).json({ error: "Payment not found" });
  }
});

module.exports = router;
