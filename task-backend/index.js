const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const allRolePermission = require("./Routes/Hr-AdminRouter");
const auth = require("./Routes/authRouter");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6"
  )
  .then(() => console.log("database connected"))
  .catch((err) => console.log("error connecting database", err.message));

app.use("/auth", auth);
app.use(allRolePermission);

app.listen(8000, () => console.log("server is running at 8000"));
