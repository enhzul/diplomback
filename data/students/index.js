const utils = require("../untils");
const config = require("../../config/dbconfig");
const sql = require("mssql");


const students = async () => {
    try {
      let pool = await sql.connect(config);
      const sqlQueries = await utils.loadSqlQueries("students");
      const list = await pool.request().query(sqlQueries.students);
      return list.recordset;
    } catch (error) {
      return error.message;
    }
  };

  const student = async (id) => {
    try {
      let pool = await sql.connect(config);
      const sqlQueries = await utils.loadSqlQueries("students");
      const list = await pool.request()
                         .input("id", sql.Int, id)
                         .query(sqlQueries.student);
      return list.recordset;
    } catch (error) {
      return error.message;
    }
  };


  const updateStudent = async (userId, studentData) => {
    try {
      console.log(studentData)
      let pool = await sql.connect(config);
      const sqlQueries = await utils.loadSqlQueries("students");
      const stUpdate = await pool.request()
                         .input("userId", sql.Int, userId)
                         .input("first_name", sql.NVarChar(255), studentData.firstname)
                         .input("last_name", sql.NVarChar(255), studentData.lastname)
                         .input("phone", sql.Int, studentData.phone)
                         .input("email", sql.Text, studentData.email)
                         .input("visible", sql.Int, studentData.visible)
                         .query(sqlQueries.studentUpdate); 
      return stUpdate.recordset;
    } catch (error) {
      return error.message;
    }
  }

  const mergejilLists = async () => {
    try {
      let pool = await sql.connect(config);
        const sqlQueries = await utils.loadSqlQueries("students");
           const list = await pool.request().query(sqlQueries.mergejilList);
         return list.recordset;
    } catch (error) {
      return error.message;
    }
  };


  module.exports = {
    updateStudent,
    student,
    students,
    mergejilLists
  };