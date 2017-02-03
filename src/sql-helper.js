
var sql = require("mssql");

var config = {
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    options: {
        encrypt: true
    },
    connectionTimeout: 300 * 60 * 1000,
    requestTimeout: 60 * 60 * 1000

};

module.exports = class SqlConnection {
    startConnection() {
        return new Promise((resolve, reject) => {
            sql.connect(config, function (err) {
                if (err)
                    reject(err);
                resolve(true);
            })
        });
    }

    transaction() {
        return new sql.Transaction();
    }

    transactionRequest(transaction) {
        return new sql.Request(transaction);
    }
}
