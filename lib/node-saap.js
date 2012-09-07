/**
 *
 *
 *
 *
 *
 *
 */
var assert = require('assert');

exports.Client = function (cred) {
    assert(cred, "Must provide credentials in order to create a SaaP Client");
    assert(cred.AccessKeyId, "Must provide AccessKeyId in order to create a SaaP Client");
    assert(cred.SecretKey, "Must provide SecretKey in order to create a SaaP Client");
};

