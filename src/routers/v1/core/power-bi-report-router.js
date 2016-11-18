var Router = require('restify-router').Router;;
var router = new Router();
var powerbi = require('powerbi-api');
var msrest = require('ms-rest');
var resultFormatter = require("../../../result-formatter");

const apiVersion = '1.0.0';

const config = {
    port: process.env.PORT || 3000,
    accessKey: process.env.POWERBI_ACCESS_KEY || "+Ulcux5S+QM7zMTpsX2bsX+S1kqtTBEum1xnx3e6XadwUfQhedMagPo9BccseN4+NCF8Zq/tYkni9fWjfsF2Eg==",
    workspaceId: process.env.POWERBI_WORKSPACE_ID || "7348ca21-9d5a-445f-b2f9-9057e418e722",
    workspaceCollection: process.env.POWERBI_WORKSPACE_COLLECTION || "PowerBIMoonlay"
};

const credentials = new msrest.TokenCredentials(config.accessKey, "AppKey");
const powerbiClient = new powerbi.PowerBIClient(credentials);

router.get('/', (request, response, next) => {
    powerbiClient.reports.getReports(config.workspaceCollection, config.workspaceId, (err, res) => {
        if (err) {
            var error = resultFormatter.fail(apiVersion, 500, err);
            response.send(500, error);
            return;
        }
        var result = resultFormatter.ok(apiVersion, 200, res.value);
        response.send(200, result);
    });
});

router.get('/:id', (request, response, next) => {
    powerbiClient.reports.getReports(config.workspaceCollection, config.workspaceId, (err, res) => {
        if (err) {
            var error = resultFormatter.fail(apiVersion, 500, err);
            response.send(500, error);
            return;
        }
        var reportID = request.params.id; // from URI 
        var reports = res.value; // get reports from API's response above
        var filteredReports = reports.filter(report => report.id === reportID); // filter out to get only specific report

        if (filteredReports.length !== 1) {
            var error = resultFormatter.fail(apiVersion, 500, new Error(`Report with ID: ${reportID} is not found.`));
            response.send(404, error);
            return;
        }

        var report = filteredReports[0]; // here, we already found the requested report.
        // we need to generate a token for embed purpose. This is bound to a single report ID.
        var embedToken = powerbi.PowerBIToken.createReportEmbedToken(config.workspaceCollection, config.workspaceId, report.id);
        // and then we need to generate an access token from the embed token. This is to obtain necessary access credentials.
        var accessToken = embedToken.generate(config.accessKey);
        var embedConfig = Object.assign({
            type: 'report',
            accessToken
        }, report);

        var result = resultFormatter.ok(apiVersion, 200, embedConfig);
        response.send(200, result);
    });
});

module.exports = router;
