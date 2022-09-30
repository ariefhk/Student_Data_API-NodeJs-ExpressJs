const mysql = require("mysql");

// host: "localhost",
// user: "root",
// password: "",
// database: "db_sekolah"

// Konfigurasi Koneksi dengan Mysql
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_sekolah",
});

// Koneksi Database
connection.connect((error) => {
  if (error) throw error;
  console.log("MySQL Connected...");
});

module.exports = connection;
