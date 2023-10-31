const minimist = require('minimist');
const params = minimist(process.argv);
const dotenv = require('dotenv');
const path = `${__dirname}/${params.prod && params.prod === 'true'
    ? '.env'
    : '.env.develop'}`
const index = dotenv.config({ path }).parsed
module.exports = {
    db: {
        main: {
            host: index.DB_MAIN_HOST,
            port: index.DB_MAIN_PORT,
            database: index.DB_MAIN_DB,
            username: index.DB_MAIN_USER,
            password: index.DB_MAIN_PASSWD,
            dialect: index.DB_MAIN_DIALECT,
            logging: console.log,
            dialectOptions: {
                dateStrings: true,
                typeCast: true
            }
        },
        mongoDB: index.MONGODB_URL
    },
    service: {
        port: process.env.API_PORT,
        logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
    },
    apiConfig: {
        port: index.API_PORT,
        secret: index.API_SECRET,
        sessionTime: index.API_SESSION_TIME,
        iniCron: index.API_CRON === 'true'
    },
    frontend: {
        url: index.FRONT_BASE_URL
    },
    expirationPass: {
        expirationPassTimeUnit: index.EXPIRATION_PASS_UNIT,
        expirationPassTimeValue: index.EXPIRATION_PASS_VALUE,
        expirationRecoveryToken: index.EXPIRATION_RECOVERY_TOKEN
    },
}

