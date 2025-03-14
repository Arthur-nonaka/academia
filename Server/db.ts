import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: "mysql",
  user: "root",
  password: "root",
  database: "academia",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default connection;
