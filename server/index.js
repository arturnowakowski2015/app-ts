import express from "express";
import http from "http";
import { fileURLToPath } from "url";
import { load, sortData } from "./controller/post.js";
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

app.get("/:database", load);
app.get("/:database/sort/:actcategory/:column/:sortDirection", sortData);
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Server Port: ${PORT}`));

// next line is the money
