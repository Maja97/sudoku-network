import express from "express";
import routesIndex from "./routes/index.js";

const app = express();

routesIndex(app);

app.listen(process.env.PORT || 80);
