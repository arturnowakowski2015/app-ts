 
import express from 'express'
import { Router } from 'express'
import express from "express";
import http from "http";
import { fileURLToPath } from "url";
import { remove, sortData, paginate, increase } from "./controller/post.js";
import cors from "cors";
import path from "path";
const app = express()

const route = Router()

route.get('/', (req, res) => {
    return res.json({
        success: true,
        message: "Sucesso!"
    })
})

app.use(route)

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log('Server running in ' + port)
})
/*
import express from "express";
import http from "http";
import { fileURLToPath } from "url";
import { remove, sortData, paginate, increase } from "./controller/post.js";
import cors from "cors";
import path from "path";
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const server = http.createServer(app);

app.use(express.json());
 
 

app.get(
  "/:database/sort/:actcategory/:column/:sortDirection/:page/:limit",
  //http://localhost:3001/comments/sort/new/email/ASC/1/10

  sortData
);
app.get("/:database/paginate/:actcategory/:page/:limit", paginate);
app.patch("/:database/:actcategory/remove/:id", remove);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Server Port: ${PORT}`));

export default app;
 */
