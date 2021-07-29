import express from "express";
import routesIndex from "./routes/index.js";
import cors from "cors";

const app = express();

routesIndex(app);
app.use(cors());
app.use("/", express.static(path.join(__dirname, "dist")));
app.listen(process.env.PORT || 80);
