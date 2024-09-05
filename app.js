const express = require("express");
require("./config/dbConnection");
const cores = require("cors");
const multer = require("multer");
const path = require("path");
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const blogRouter = require("./routes/blog.route");
const categoryRouter = require("./routes/category.route");
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images"); // Folder where the images will be saved
  },
  filename: (req, file, cb) => {
    // Use the original filename or generate a unique one
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(201).json("Image or file has been uploaded");
});

app.use("/Images", express.static(path.join(__dirname, "/Images")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cores());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
