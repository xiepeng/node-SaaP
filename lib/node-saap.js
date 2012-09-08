/**
 *
 */
var assert  = require('assert');
var url     = require('url');
var crypto  = require('crypto');
var http    = require('http');

exports.Client = function (options) {
    assert(options,                "Must provide an endpoint and credentials in order to create a SaaP Client");
    assert(options.Endpoint,       "Must provide an endpoint in order to create a SaaP Client");
    assert(options.AccessKeyId,    "Must provide AccessKeyId in order to create a SaaP Client");
    assert(options.SecretKey,      "Must provide SecretKey in order to create a SaaP Client");

    var endpoint = options.Endpoint;
    var accessKeyId = options.AccessKeyId;
    var secretKey = options.SecretKey;

    this.get = function (queryString, callback){
        var now = new Date();
        var stringToSign = "";
        // stringToSign += "GET" + "\n";
        stringToSign += "SAAP1-HMAC-SHA256" + "\n";
        stringToSign += "host:" + endpoint + "\n";
        stringToSign += "path:" + url.parse(queryString).pathname + "\n";
        stringToSign += "AccessKeyId:" + accessKeyId + "\n";
        stringToSign += "Date:" + now.toUTCString() + "\n";
        var signature = crypto.createHmac('sha256', secretKey).update(stringToSign).digest('base64');

        var options = {
            host    : endpoint,
            port    : 80,
            path    : queryString,
            method  : 'GET',
            headers : {
                "x-saap-date"       : now.toUTCString(),
                "x-saap-accesskeyid": accessKeyId,
                "x-saap-signature"  : signature,
                "Content-Type"      : "application/json"
            }
        };

        http.request(options, function (res) {
            if (res.statusCode !== 200) return callback(true, res);
            else callback (null, res);
        }).end();


    };

    this.put = function (queryString){
        var stringToSign = '';
    };

    return this;

};

