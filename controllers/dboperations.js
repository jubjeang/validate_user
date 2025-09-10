// dboperations.js
var config = require("../server/dbconfig");
const sql = require('mssql');


// ฟังก์ชัน getuserinfo: รับ { jobid, password } คืน user row ถ้าพบ
async function getuserinfo(data_all) {
  let username = data_all["username"];
  let password = data_all["password"];
  try {
    let pool = await sql.connect(config);
    let spCheckUser = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .input("password", sql.NVarChar, password)
      .execute("spCheckUser");
    return spCheckUser.recordsets;
  } catch (error) {
    console.error("error: ", error);
    return [{ error: error }];
  }
}

module.exports = {
    getuserinfo
};
