const assert = require("assert");
const MongoClient = require('mongodb').MongoClient;
const config = require('./config/dbConfig');

let _db;

function initDb(callback) {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }
MongoClient.connect(config.url, config.dbName, connected);
function connected(err, db) {
        if (err) {
            return callback(err);
        }
        console.log("DB initialized - connected to: " + config.url.split("@")[1]);
        _db = db;
        return callback(null, _db);
    }
}

function getDb() {
    assert.ok(_db, "Db has not been initialized. Please called init first.");
    return _db;
}

module.exports = {
    getDb,
    initDb
};
