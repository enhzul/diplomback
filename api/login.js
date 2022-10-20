const axios = require("axios");
const { DateTimeOffset } = require("mssql");
const { getTenant, getjob } = require("../dboperation");
module.exports.login = async ({ grant_type, client_id, refresh_token, id }) => {
  try {
    const response = await axios.post(
      "https://account.uipath.com/oauth/token",
      {
        grant_type: grant_type,
        client_id: client_id,
        refresh_token: refresh_token,
      }
    );
    if (response.status === 200) {
      return { token: response.data.access_token, id };
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

const getJson = async ({ token, id }) => {
  const text = await getTenant(id);
  let ts = Date.now();

  let date = new Date(ts);
  let date_ob = new Date(date.setDate(date.getDate() - 2));
  let day = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  console.log(year, " onii ", month, " sariin ", day);
  const response = await axios({
    method: "GET",
    headers: { authorization: "Bearer " + token },
    url: `https://cloud.uipath.com/${text[0].org_name}/${text[0].tenantName}/orchestrator_/odata/Jobs?$filter=year(StartTime) eq ${year} and month(StartTime) eq ${month} and day(StartTime) ge ${day}`,
  });
  if (response.status === 200) {
    return { data: response.data.value, auth_id: text[0].auth_id };
  } else {
    console.log("bearer no");
    return [];
  }
};
module.exports.getJson = getJson;
