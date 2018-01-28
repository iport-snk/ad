module.exports = {
    ad: {},
    connect: function() {
        var mysqlDb = require('promise-mysql');
        this.ad =  mysqlDb.createPool({
            host     : 'df.fun.co.ua',
            database : 'ad',
            user     : 'ad_user',
            password : 'Iport2018'
        });
        this.ad.on('connection', function(connection) {
            connection.query("SET NAMES 'utf8'")
        });
    }
};