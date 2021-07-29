import express from "express";
import routesIndex from "./routes/index.js";
import cors from "cors";
import path from "path";

const path = path;
const app = express();

routesIndex(app);
app.use(cors());
app.use(express.static("build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});
app.listen(process.env.PORT || 80);
