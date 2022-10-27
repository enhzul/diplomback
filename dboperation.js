const dbconfig = require("./config/dbconfig");
const sql = require("mssql");
const { response } = require("express");
async function getRole() {
  try {
    let pool = await sql.connect(dbconfig);
    let result = await pool
      .request()
      .query("Select grant_type, client_id, refresh_token,id from auth_token ");
    return result.recordset;
  } catch (err) {
    console.log(err);
  }
}
async function getTenant(id) {
  try {
    let pool = await sql.connect(dbconfig);
    let result1 = await pool
      .request()
      .query(`select * from Tenant where auth_id = ${id}`);
    return result1.recordset;
  } catch (err) {
    console.log(err);
  }
}
async function getjob(id) {
  try {
    let pool = await sql.connect(dbconfig);
    let result = await pool
      .request()
      .query(`select * from jobs where Id = ${id}`);
    return result.rowsAffected;
  } catch (err) {
    console.log(err);
  }
}

async function insert({ obj, id }) {
  try {
    let pool = await sql.connect(dbconfig);
    let insertJson = await pool
      .request()
      .input("StartTime", sql.Text, obj.StartTime)
      .input("EndTime", sql.Text, obj.EndTime)
      .input("State_1", sql.Text, obj.State)
      .input("JobPriority", sql.Text, obj.JobPriority)
      .input("SpecificPValue", sql.Int, obj.SpecificPriorityValue)
      .input("Source_1", sql.Text, obj.Source)
      .input("SourceType", sql.Text, obj.SourceType)
      .input("BatchExecutionKey", sql.Text, obj.BatchExecutionKey)
      .input("Info", sql.Text, obj.Info)
      .input("CreationTime", sql.Text, obj.CreationTime)
      .input("ReleaseName", sql.Text, obj.ReleaseName)
      .input("Type_1", sql.Text, obj.Type)
      .input("InputArguments", sql.Text, obj.InputArguments)
      .input("OutputArguments", sql.Text, obj.OutputArguments)
      .input("HostMachineName", sql.Text, obj.HostMachineName)
      .input("HasMediaRecorded", sql.Bit, obj.HasMediaRecorded)
      .input("PersistenceId", sql.Text, obj.PersistenceId)
      .input("ResumeVersion", sql.Text, obj.ResumeVersion)
      .input("StopStrategy", sql.Text, obj.StopStrategy)
      .input("RuntimeType", sql.Text, obj.RuntimeType)
      .input("RequiresUserI", sql.Bit, obj.RequiresUserInteraction)
      .input("ReleaseVersionId", sql.Int, obj.ReleaseVersionId)
      .input("EntryPointPath", sql.Text, obj.EntryPointPath)
      .input("OrganizationUnitId", sql.Int, obj.OrganizationUnitId)
      .input("fiedName", sql.Text, obj.OrganizationUnitFullyQualifiedName)
      .input("Reference", sql.Text, obj.Reference)
      .input("ProcessType", sql.Text, obj.ProcessType)
      .input("ProfilingOptions", sql.Bit, obj.ProfilingOptions)
      .input("RSConnvarchar", sql.Bit, obj.ResumeOnSameContext)
      .input("RemoteControlAccess", sql.Text, obj.RemoteControlAccess)
      .input("Id", sql.Int, obj.Id)
      .input("auth_id", sql.Int, id)
      .query(
        "insert into jobs(StartTime, EndTime, State_1, JobPriority, SpecificPValue, Source_1, SourceType, BatchExecutionKey, Info, CreationTime, ReleaseName, Type_1, InputArguments, OutputArguments, HostMachineName, HasMediaRecorded, PersistenceId, ResumeVersion, StopStrategy, RuntimeType, RequiresUserI, ReleaseVersionId, EntryPointPath, OrganizationUnitId, fiedName, Reference, ProcessType, ProfilingOptions, RSConnvarchar, RemoteControlAccess, Id, auth_id) values(@StartTime, @EndTime, @State_1, @JobPriority, @SpecificPValue, @Source_1, @SourceType, @BatchExecutionKey, @Info, @CreationTime , @ReleaseName, @Type_1, @InputArguments, @OutputArguments, @HostMachineName, @HasMediaRecorded, @PersistenceId, @ResumeVersion, @StopStrategy, @RuntimeType, @RequiresUserI, @ReleaseVersionId, @EntryPointPath, @OrganizationUnitId, @fiedName, @Reference, @ProcessType, @ProfilingOptions, @RSConnvarchar, @RemoteControlAccess, @Id, @auth_id)"
      );
    // console.log(insertJson);
    return insertJson.recordsets;
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  getRole: getRole,
  getTenant: getTenant,
  getjob: getjob,
  insert: insert,
};
