var sql = require("mssql");

const dbconfig = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE,
  dialect: 'mssql',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  port: 1433,

};
module.exports = dbconfig;

// sql.connect(dbconfig, function (err) {

//   if (err) console.log(err);

//   // create Request object
//   var request = new sql.Request();

//   // query to the database and get the records
//   request.query('select * from users', function (err, recordset) {

//       if (err) console.log(err)

//       // send records as a response
//       res.send(recordset);

//   });
// });