import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const DB = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 0,
});


DB.query((err) => {
  if (err) {
    console.log(err.message);
  }
  if (err.message === "connect ECONNREFUSED ::1:3306") {
    console.log("db disconnected");
  } else {
    console.log("db connected");
  }
});

export default DB;