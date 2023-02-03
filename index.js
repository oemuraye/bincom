import express from "express";
import dotenv from "dotenv";
import methodOverride from "method-override";
import exphbs from "express-handlebars";

import routes from "./routes/routes.js";
import DB from './database/connection.js';
import { rmSync } from "fs";

const app = express();
dotenv.config();

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.use("/public", express.static("public"));

app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

const PORT = process.env.PORT || 5000;

app.use("/", routes);

app.listen(PORT, () => {
  console.log(` server started on port http://localhost:${PORT} `);
});