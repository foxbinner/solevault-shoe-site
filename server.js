require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use(express.static("."));

app.get("/", (_, res) => {
  res.sendFile(__dirname + "/legacy/index.html");
});

app.get("/product", (_, res) => {
  res.sendFile(__dirname + "/legacy/product.html");
});

app.get("/cart", (_, res) => {
  res.sendFile(__dirname + "/legacy/cart.html");
});

app.get("/checkout", (_, res) => {
  res.sendFile(__dirname + "/legacy/checkout.html");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
