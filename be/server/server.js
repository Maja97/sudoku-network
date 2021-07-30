import express from "express";
import routesIndex from "./routes/index.js";
import cors from "cors";

const app = express();

routesIndex(app);
app.use(cors());
const path = require("path");

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "fe", "build", "index.tsx"));
});

app.listen(process.env.PORT || 3001);
