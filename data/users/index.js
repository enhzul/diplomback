const utils = require("../untils");
const config = require("../../config/dbconfig");
const sql = require("mssql");
const { token } = require("morgan");

const usersAll = async () => {
  try {
    let pool = await sql.connect(config);
    const sqlQueries = await utils.loadSqlQueries("users");
    const list = await pool.request().query(sqlQueries.userList);
    return list.recordset;
  } catch (error) {
    return error.message;
  }
};

const userById = async (Id) =>{
  try {
    const userId = Id;
    let pool = await sql.connect(config);
    const sqlQueries = await utils.loadSqlQueries("users");
    const oneUser = await pool.request().input('userId',sql.Int,userId)
    .query(sqlQueries.userById);
    return oneUser.recordset;
  }catch(error){
    return error.message;
  }
}
const userCreate = async (userData) => {
try{
  let pool = await sql.connect(config);
    const sqlQueries = await utils.loadSqlQueries("users");
    const insertUser = await pool.request()
              .input('username', sql.NVarChar(255), userData.username)
              .input('password', sql.NText, userData.password)
              .input("status", sql.Bit, userData.status)
              .query(sqlQueries.createUser);
              return insertUser.recordset;
 }
catch (error){
    return error.message;
    }
}
const createRoleUser = async (userId) => {
  console.log(userId[0].id,"userId")
try{
  let pool = await sql.connect(config);
    const sqlQueries = await utils.loadSqlQueries("users");
    const insertUser = await pool.request()
              .input('userId', sql.Int, userId[0].id)
              .input('roleId', sql.Int, 2)
              .query(sqlQueries.createRole);
              return insertUser.recordset;
 }
catch (error){
    return error.message;
    }
}
const getUserByUserEmail = async (username) => {
  try{
    let pool = await sql.connect(config);
    const sqlQueries = await utils.loadSqlQueries("users");
    const login = await pool.request()
                  .input('username', sql.NVarChar(300), username)
                  .query(sqlQueries.login);
                  return login.recordset[0];
  }
  catch(error){
    return error.message;
  }
}
const userRole = async (Id) =>{
  try {
    const userId = Id;
    let pool = await sql.connect(config);
    const sqlQueries = await utils.loadSqlQueries("users");
    const oneUser = await pool.request().input('userId',sql.Int,userId)
    .query(sqlQueries.userRole);
    return oneUser.recordset;
  }catch(error){
    return error.message;
  }
}

const tokenSave = async (userId, refreshToken) =>{
  try {
    let pool = await sql.connect(config);
    const sqlQueries = await utils.loadSqlQueries("users");
    const tokenSave = await pool.request().input('userId',sql.Int,userId)
                                        .input("token", sql.Text, refreshToken)
                                     .query(sqlQueries.userTokenSave);
    return tokenSave.recordset;
  }catch(error){
    return error.message;
  }
}

const reftokenCheck = async (refreshToken) => {
  try {
    let pool = await sql.connect(config);
    const sqlQueries = await utils.loadSqlQueries("users");
    const tokenRef = await pool.request().input('refreshToken',sql.Text, refreshToken)
                                        .query(sqlQueries.userTokenSearch);
    return tokenRef.recordset;
  }catch(error){
    return error.message;
  }
}

module.exports = {
  tokenSave,
  usersAll,
  userById,
  userCreate,
  getUserByUserEmail,
  userRole,
  createRoleUser,
  reftokenCheck
};