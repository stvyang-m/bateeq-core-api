module.exports = class SqlConnection {

    constructor() {
        this.sql = require("mssql");

        this.config = {
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
    }

    startConnection() {
        return new Promise((resolve, reject) => {
            this.sql.connect(this.config, function (err) {
                if (err)
                    reject(err);
                resolve(true);
            })
        });
    }

    transaction() {
        return new this.sql.Transaction();
    }

    transactionRequest(transaction) {
        return new this.sql.Request(transaction);
    }
}
