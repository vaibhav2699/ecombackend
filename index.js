require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

const CONFIG = require("./config/config");
const port = process.env.PORT || 8080;

const mongoString =
  "mongodb+srv://" +
  CONFIG.mogno.MONGO_USERNAME +
  ":" +
  CONFIG.mogno.MONGO_PASSWORD +
  "@" +
  CONFIG.mogno.MONGO_HOST +
  "/" +
  CONFIG.mogno.MONGO_DBNAME; //process.env.DATABASE_URL;

console.log("MongoDB String: ", mongoString);

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();
app.use(express.json({ extended: false, limit: "50mb" }));
// app.use(express.json());
app.use(
  express.urlencoded({ limit: "50mb", extended: false, parameterLimit: 50000 })
);
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.static("public"));
app.get("/public/img/:folderName/:fileName", async (req, res) => {
  const { folderName, fileName } = req.params;
  res.sendFile(
    path.join(__dirname, "public/img/" + folderName + "/" + fileName)
  );
});

routes.initialize(app);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
