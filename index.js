const express = require("express");
const app = express();

// *Middleware to parse JSON request bodies
app.use(express.json());

// *First Middleware (Logger) Log the request method and url
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// *Routes

// * Get Request
app.get("/", (req, res) => {
  res.send("Hello Shubham");
});

app.get("/about", (req, res) => {
  res.json({
    name: "Shubham",
    age: 29,
    city: "Bhilai",
  });
});

app.get("/contact/:name", (req, res) => {
  const name = req.params.name;
  res.send(`Hello ${name}`);
});

// * Post Request (Simple API , Without Validation)
app.post("/add", (req, res) => {
  //    req body will contain the parsed JSON sent by the client
  res.json({
    received: req.body,
    message: "Data added successfully",
  });
});

// * Post Request (With Validation)
app.post("/addvalidated", (req, res) => {
  const {message, number } = req.body;
  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }
  if (typeof number !== "number") {
    return res.status(400).json({ message: "Number must be a number" });
  }
  res.json({ received: req.body, message: "Data added successfully" });
});

// *Port Number
app.listen(3000, () => {
  console.log("We have Started our server on port 3000");
});

// *404 Handler and Error Handler
// *404 Handler
app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

// *Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
