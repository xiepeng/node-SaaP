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

    this.get = function (options, callback){
        var queryString, contentLength;
        if (options.path) {
            queryString = options.path;
            contentLength = options.contentLength;
        } else {
            queryString = options;
            contentLength = 0;
        }

        var now = new Date();
        var stringToSign = "";
        // stringToSign += "GET" + "\n";
        stringToSign += "SAAP1-HMAC-SHA256" + "\n";
        stringToSign += "GET" + "\n";
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
                "Content-Length"    : contentLength,
                "x-saap-date"       : now.toUTCString(),
                "x-saap-accesskeyid": accessKeyId,
                "x-saap-signature"  : signature,
                "Content-Type"      : "application/json"
            }
        };

        var req = http.request(options, function (res) {
            if (res.statusCode !== 200) return callback(true, res);
            else callback (null, res);
        });

        return req;

    };

    this.put = function (options, callback){
        var queryString = options.path;
        var contentLength = options.contentLength;
        var now = new Date();
        var stringToSign = "";
        // stringToSign += "GET" + "\n";
        stringToSign += "SAAP1-HMAC-SHA256" + "\n";
        stringToSign += "PUT" + "\n";
        stringToSign += "host:" + endpoint + "\n";
        stringToSign += "path:" + url.parse(queryString).pathname + "\n";
        stringToSign += "AccessKeyId:" + accessKeyId + "\n";
        stringToSign += "Date:" + now.toUTCString() + "\n";
        var signature = crypto.createHmac('sha256', secretKey).update(stringToSign).digest('base64');

        var options = {
            host    : endpoint,
            port    : 80,
            path    : queryString,
            method  : 'PUT',
            headers : {
                "Content-Length"    : contentLength,
                "x-saap-date"       : now.toUTCString(),
                "x-saap-accesskeyid": accessKeyId,
                "x-saap-signature"  : signature,
                "Content-Type"      : "application/json"
            }
        };

        var req = http.request(options, function (res) {
            if (res.statusCode !== 201) return callback(true, res);
            else callback (null, res);
        });

        return req;
    };

    this.post = function (options, callback){
        var queryString = options.path;
        var contentLength = options.contentLength;
        var now = new Date();
        var stringToSign = "";
        // stringToSign += "GET" + "\n";
        stringToSign += "SAAP1-HMAC-SHA256" + "\n";
        stringToSign += "POST" + "\n";
        stringToSign += "host:" + endpoint + "\n";
        stringToSign += "path:" + url.parse(queryString).pathname + "\n";
        stringToSign += "AccessKeyId:" + accessKeyId + "\n";
        stringToSign += "Date:" + now.toUTCString() + "\n";
        var signature = crypto.createHmac('sha256', secretKey).update(stringToSign).digest('base64');

        var options = {
            host    : endpoint,
            port    : 80,
            path    : queryString,
            method  : 'POST',
            headers : {
                "Content-Length"    : contentLength,
                "x-saap-date"       : now.toUTCString(),
                "x-saap-accesskeyid": accessKeyId,
                "x-saap-signature"  : signature,
                "Content-Type"      : "application/json"
            }
        };

        var req = http.request(options, function (res) {
            if (res.statusCode !== 200) return callback(true, res);
            else callback (null, res);
        });

        return req;
    };

    return this;
};

