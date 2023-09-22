import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// Routes
import diaryRouter from "./routes/diaryInterface.js";

dotenv.config();

const app = express();
app.use(bodyParser.json()); //有人進來就執行
app.use(cors()); // 允許所有跨來源請求

/*
It's simply not allowed by browsers to perform a cors request from a local file.

const corsOptions = {
  origin: [
    // 'https://www.example.com',
    'http://localhost:8000',
    'file:///Users/yhl/Documents/WebProgramming/112-1-unit1-todo-list/frontend/index.html'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
};
// 
app.use(cors(corsOptions));
*/

// To make the code more readable, we will use `router` to handle each resource.
app.use("/api/diary", diaryRouter);
// 指定傳入app的url default的路徑是/api/todos

app.get("/heartbeat", (_, res) => {
  return res.send({ message: "Hello Worldkoefkoe!" });
});

const port = process.env.PORT || 8000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // We move app.listen() here to make sure that the server is started after the connection to the database is established.
    app.listen(port, () =>
      console.log(`Server running on port http://localhost:${port}`),
    );
    // If the connection is successful, we will see this message in the console.
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    // Catch any errors that occurred while starting the server
    console.log(error.message);
  });