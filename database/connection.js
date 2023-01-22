import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const DB = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DATABASE,
});


DB.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("db " + DB.state);
});

export default DB;