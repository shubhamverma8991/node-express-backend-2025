const express = require("express");
const app = express();
// *.env config
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// * Zod Config
const { z } = require("zod");

// * for Prisma
const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

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
  const { message, number } = req.body;
  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }
  if (typeof number !== "number") {
    return res.status(400).json({ message: "Number must be a number" });
  }
  res.json({ received: req.body, message: "Data added successfully" });
});

// * Post Request (With Validation using zod)
app.post("/echo", (req, res) => {
  const schema = z.object({
    message: z.string().min(1, "Message is required"),
    number: z.number().optional(),
  });
  const parsedData = schema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({ error: parsedData.error.issues });
  }

  res.json({ received: parsedData.data });
});

// * POST Request for Database
app.post("/messages", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  try {
    const message = await prisma.message.create({
      data: { text },
    });
    res.json({ message });
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
});

// * Get Endpoint to fetch messages from DB
app.get("/getAll", async (req, res) => {
  const messages = await prisma.message.findMany();
  res.json({ messages });
});

// *Port Number
app.listen(PORT, () => {
  console.log(`We have Started our server on port ${PORT}`);
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
