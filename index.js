const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51QWjfJ1wZ7pNbGLXxOQWFnSp3u9ZN3Fsyhp25VO1wSQGhIRtvFUbHQnUs4c4NwM1CEoIkmj9eAOki5pZ4MNKQkdI00PouVRdzX"
);

const app = express();
const PORT = 6001;

app.use(cors());
app.use(express.json());
// mongodb username
// username : shashanksakhre02
// password: 0lA4Zx6i7LWwGW5Z
// mongodb+srv://shashanksakhre02:<db_password>@foodapp.kuqvo.mongodb.net/?retryWrites=true&w=majority&appName=foodapp

connectToMongoDB("mongodb://localhost:27017/foodilicious").then(() => {
  console.log("mongo DB connected");
});

app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.send({ token });
});

const menuRoutes = require("./routes/menuRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoute");

app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use("/users", userRoutes);
app.use("/payments", paymentRoutes);

// middleware

app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://shashanksakhre02:<db_password>@foodapp.kuqvo.mongodb.net/?retryWrites=true&w=majority&appName=foodapp";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
