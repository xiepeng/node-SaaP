/**
 *
 *
 *
 *
 *
 *
 */
var assert  = require('assert');
var url     = require('url');
var crypto  = require('crypto');

exports.Client = function (options) {
    assert(options,                "Must provide an endpoint and credentials in order to create a SaaP Client");
    assert(options.Endpoint,       "Must provide an endpoint in order to create a SaaP Client");
    assert(options.AccessKeyId,    "Must provide AccessKeyId in order to create a SaaP Client");
    assert(options.SecretKey,      "Must provide SecretKey in order to create a SaaP Client");

    this.get = function (queryString){
        var now = new Date();
        var stringToSign = "";
        stringToSign += "GET" + "\n";
        stringToSign += "SAAP1-HMAC-SHA256" + "\n";
        stringToSign += "host:" + options.Endpoint + "\n";
        stringToSign += "path:" + url.parse(queryString).pathname + "\n";
        stringToSign += "AccessKeyId:" + options.AccessKeyId + "\n";
        stringToSign += "Date:" + now.toUTCString() + "\n";
        var signature = crypto.createHmac('sha256').update(stringToSign).digest('base64');
    };

    this.put = function (queryString){
        var stringToSign = '';
    };

};

