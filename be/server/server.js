import express from "express";
import routesIndex from "./routes/index.js";
import cors from "cors";
import path from "path";

const app = express();
const __dirname = path.resolve();

routesIndex(app);
app.use(cors());

app.use(express.static(path.join("fe", "build"), { root: ".." }));

app.get("*", (req, res) => {
  res.sendFile(path.join("fe", "build", "index.html"), { root: ".." });
});

app.listen(process.env.PORT || 3001);
