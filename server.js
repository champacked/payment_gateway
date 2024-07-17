const express = require("express");
const app = express();
const paymentRoutes = require("./routes/payments");
const sequelize = require("./config/database");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

app.use(express.json());
app.use("/payments", paymentRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
