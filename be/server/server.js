import express from "express";
import routesIndex from "./routes/index.js";
import cors from "cors";
import path from "path";

const app = express();

routesIndex(app);
app.use(cors());
app.use(express.static("build"));

app.listen(process.env.PORT || 80);
