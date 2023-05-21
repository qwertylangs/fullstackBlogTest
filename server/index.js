import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import fs from "fs";

import {
  loginValidation,
  registerValidation,
  postCreateValidation,
} from "./validations.js";

import { checkAuth, handleValidationErrors } from "./utils/index.js";

import { PostController, UserController } from "./controllers/index.js";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB Ok"))
  .catch((err) => console.log("DB Error:" + err));

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

// GET
app.get("/", (req, res) => {
  res.send("Hello World! !!!  ");
});
app.get("/auth/me", checkAuth, UserController.getMe);
app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.get("/tags", PostController.getLastTags);

// POST
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);

// DELETE
app.delete("/posts/:id", checkAuth, PostController.remove);

// PATCH
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    console.log("Error:" + err);
  }
  console.log("Server is running on port 4444");
});
