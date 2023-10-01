import express from "express";
import http from "http";
import { fileURLToPath } from "url";
import {
  remove,
  sortData,
  paginate,
  dataLength,
  increase,
  get,
  update,
  filterstr,
} from "./controller/post.js";
import cors from "cors";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const server = http.createServer(app);

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3001",
      "http://localhost:3000",
      "http://127.0.0.1:3002",
      "https://xydxrz-3000.csb.app"
    ],
  })
);
increase();
app.get(
  "/:database/sort/:actcategory/:column/:sortDirection/:page/:limit",
  //http://localhost:3001/comments/sort/new/email/ASC/1/10

  sortData
);

app.patch("/:database/:actcategory/update/:id", update);
app.get("/:database/paginate/:actcategory/:page/:limit", paginate);
app.get("/:database/filter/:actcategory/:searchedstr/:page/:limit", filterstr);
app.get("/:database/:actcategory/getrecord/:id", get);

//localhost:3001/comments/new/getrecord/4

app.patch("/:database/:actcategory/remove/:id", remove);
app.get("/:database/:actcategory/len", dataLength);
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Server Port: ${PORT}`));

export default app;
