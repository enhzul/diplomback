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
      let pool = await sql.connect(config);
      const sqlQueries = await utils.loadSqlQueries("students");
      const stUpdate = await pool.request()
                         .input("userId", sql.Int, userId)
                         .input("first_name", sql.NVarChar(255), studentData.first_name)
                         .input("last_name", sql.NVarChar(255), studentData.last_name)
                         .input("phone", sql.Int, studentData.phone)
                         .input("department_id", sql.Int, studentData.department_id)
                         .input("email", sql.Text, studentData.email)
                         .input("school_startDate", sql.DateTime, studentData.school_startDate)
                         .input("school_startEnd", sql.DateTime, studentData.school_startEnd)
                         .input("zereg_id", sql.Int, studentData.zereg_id)
                         .input("updated_dat", sql.DateTime, studentData.updated_dat)
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