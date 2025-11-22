// env.js
require("dotenv").config();

const ENV = {
    APPLICATION_ID: process.env.APPLICATION_ID || "",
    DISCORD_TOKEN: process.env.DISCORD_TOKEN || "",
    PUBLIC_KEY: process.env.PUBLIC_KEY || ""
};

module.exports = ENV;
