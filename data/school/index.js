const utils = require("../untils");
const config = require("../../config/dbconfig");
const sql = require("mssql");


const lists = async () => {
    try {
      let pool = await sql.connect(config);
      const sqlQueries = await utils.loadSqlQueries("school");
      const list = await pool.request().query(sqlQueries.mergejilList);
      return list.recordset;
    } catch (error) {
      return error.message;
    }
  };

  
const countlists = async () => {
  try {
    let pool = await sql.connect(config);
    const sqlQueries = await utils.loadSqlQueries("school");
     const list = await pool.request().query(sqlQueries.mgjCount);
    return list.recordset;
  } catch (error) {
    return error.message;
  }
};

const studentList = async () => {
  try {
    let pool = await sql.connect(config);
    const sqlQueries = await utils.loadSqlQueries("school");
     const list = await pool.request().query(sqlQueries.student_list);
    return list.recordset;
  } catch (error) {
    return error.message;
  }
};
  
  
  module.exports = {
    lists,
    countlists,
    studentList
  };