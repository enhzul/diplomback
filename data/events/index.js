const utils = require("../untils");
const config = require("../../config/dbconfig");
const sql = require("mssql");

const getEvents = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("events");
    const list = await pool.request().query(sqlQueries.eventslist);
    return list.recordset;
  } catch (error) {
    return error.message;
  }
};
module.exports = {
  getEvents,
};
