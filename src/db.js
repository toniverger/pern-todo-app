const { Pool } = require("pg");
const { devConfig, prodConfig } = require("./config");

const db = new Pool(process.env.NODE_ENV === "production" ? prodConfig : devConfig);

module.exports = db;
