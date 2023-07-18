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

app.get(
  "/:database/sort/:actcategory/:column/:sortDirection/:from/:to",
  //http://localhost:3001/comments/sort/new/id/ASC/1/11

  sortData
);
app.get("/:database/paginate/:actcategory/:from/:to", paginate);
app.delete("/:database/:actcategory/remove/:id", remove);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Server Port: ${PORT}`));

// next line is the money
