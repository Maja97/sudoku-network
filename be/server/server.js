import express from "express";
import routesIndex from "./routes/index.js";
import cors from "cors";
import path from "path";

const app = express();

routesIndex(app);
app.use(cors());

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "fe", "build", "index.tsx"));
});

app.listen(process.env.PORT || 3001);
