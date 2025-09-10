require('dotenv').config()
const config = {
    user : process.env.DB_UN,//'sa',
    password : process.env.DB_PW,//'ahost!1234',
    server: process.env.DB_SERVER,
    database:process.env.DB_DATABASE,//'CIT_ReportDB_GFCCP_PROD',
    options:{
        validateBulkLoadParameters: false,
        rowCollectionOnRequestCompletion: true,
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    },
}
module.exports = config; 