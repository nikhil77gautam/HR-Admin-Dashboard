const express = require("express");
const mongoose = require("mongoose");
const dotenv =require("dotenv")
const cors = require("cors");

const allRolePermission = require("./Routes/Hr-AdminRouter");
const auth = require("./Routes/authRouter");

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config()

mongoose
  .connect(
    process.env.DATA_BASE
  )
  .then(() => console.log("database connected"))
  .catch((err) => console.log("error connecting database", err.message));

app.use("/auth", auth);
app.use(allRolePermission);

app.listen(8000, () => console.log("server is running at 8000"));
