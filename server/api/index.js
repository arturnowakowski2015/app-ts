import express from "express";
import http from "http";
import { fileURLToPath } from "url";
import { remove, sortData, paginate, increase } from "./controller/post.js";
import cors from "cors";
import path from "path";
/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
/* REGISTER USER */

app.get("/aa", (req, res) => res.send("eeee"));

module.exports = app;
