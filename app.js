const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const connection = require("./Config/database");
const app = express();
const PORT = process.env.PORT || 5000;

// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// buat server
app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});

// Insert Data
app.post("/insert_data_siswa", (req, res) => {
  // Menerima data dari request body
  var nis = req.body.nis;
  var nama = req.body.nama;
  var umur = req.body.umur;
  var alamat = req.body.alamat;
  var query_create =
    "INSERT INTO tb_siswa (nis, nama, umur, alamat) VALUES (?, ?, ?, ?)";
  var values_create = [nis, nama, umur, alamat];

  connection.query(query_create, values_create, (error, rows, field) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Gagal insert data!", error: error });
    }
    // jika request berhasil
    res.status(201).json({ success: true, message: "Berhasil insert data!" });
  });
});

app.get("/get_data_siswa", (req, res) => {
  // query sql
  var query_read = "SELECT * FROM tb_siswa WHERE 1 = 1 ";

  connection.query(query_read, (error, rows, field) => {
    // error handling
    if (error) {
      return res.status(500).json({ message: "Ada kesalahan", error: error });
    }

    // jika request berhasil
    res.status(200).json({ success: true, data: rows });
  });
});

// update data
app.put("/update_data_siswa", (req, res) => {
  var nis = req.body.nis;
  var nama = req.body.nama;
  var umur = req.body.umur;
  var alamat = req.body.alamat;

  const querySearch = "SELECT * FROM tb_siswa WHERE nis = ?";
  var queryUpdate = "UPDATE tb_siswa SET nis=nis";

  if (nama) {
    queryUpdate += ` ,nama= ${mysql.escape(nama)}`;
  }
  if (umur) {
    queryUpdate += ` ,umur= ${mysql.escape(umur)}`;
  }
  if (alamat) {
    queryUpdate += ` ,alamat= ${mysql.escape(alamat)}`;
  }

  queryUpdate += ` WHERE nis = ${mysql.escape(nis)}`;

  // jalankan query untuk melakukan pencarian data
  connection.query(queryUpdate, (err, result, field) => {
    // error handling
    if (err) {
      return res.status(500).json({ message: "Ada kesalahan", error: error });
    }

    // Membuat respon untuk dikembalikan dalam format JSON
    var response_payload = {
      description: "Berhasil mengupdate data siswa",
    };

    // Mengembalikan respon
    res.json(response_payload);
  });
});

// delete data
app.delete("/delete_data_siswa/", (req, res) => {
  var nis = req.query.nis;
  // buat query sql untuk mencari data dan hapus
  var queryDelete = "DELETE FROM tb_siswa WHERE nis = " + mysql.escape(nis);

  // jalankan query untuk melakukan pencarian data
  connection.query(queryDelete, (err, rows, field) => {
    // error handling
    if (err) {
      return res.status(500).json({ message: "Ada kesalahan", error: error });
    }

    // Membuat respon untuk dikembalikan dalam format JSON
    var response_payload = {
      description: `Berhasil mengdelete data siswa dengan nis ${nis}`,
    };

    // Mengembalikan respon
    res.json(response_payload);
  });
});
