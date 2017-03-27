var pkgcloud = require('pkgcloud');

var config = {
    provider: 'openstack',
    useServiceCatalog: true,
    useInternal: false,
    keystoneAuthVersion: 'v3',
    authUrl: 'https://identity.open.softlayer.com',
    tenantId: '579e07a44cb24b4faaa8e0e6d3cfe9ee',    //projectId from credentials
    domainId: '274c882cb8a24aa0bffdf335b6922929',
    username: 'admin_5d238012e1908120978584f07500373996db292f',
    password: 'gP4Jpa~M/K~r999V',
    region: 'dallas',//dallas or london region
    projectid: '3d10d7cb-1ee2-46ec-97ee-7a5e243ebfaa'   
};

module.exports = {
    getStorageClient() {
        return new Promise((resolve, reject) => {
            var storageClient = pkgcloud.storage.createClient(config);
            storageClient.auth(function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(storageClient);
                }
            });
        });
    }
}


