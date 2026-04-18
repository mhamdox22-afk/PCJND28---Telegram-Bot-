'use strict';

const mysql = require('mysql');

const DATABASE_CONFIG = {
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'jnd28',
        password: 'jnd28',
        database: 'jnd28'
    },
    pool: {
        connectionLimit: 10,
        queueLimit: 0,
        waitForConnections: true
    },
    options: {
        multipleStatements: true,
        charset: 'utf8mb4',
        timezone: '+08:00',
        connectTimeout: 10000,
        acquireTimeout: 10000
    }
};

function createDatabasePool() {
    const poolConfig = Object.assign(
        {},
        DATABASE_CONFIG.connection,
        DATABASE_CONFIG.pool,
        DATABASE_CONFIG.options
    );
    
    return mysql.createPool(poolConfig);
}

function validateConnection(pool) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('❌ 数据库连接池验证失败:', err.message);
                reject(err);
            } else {
                console.log('✅ 数据库连接池创建成功');
                connection.release();
                resolve(true);
            }
        });
    });
}

const dbPool = createDatabasePool();

module.exports = {
    pool: dbPool,
    config: DATABASE_CONFIG,
    validateConnection: validateConnection
};
