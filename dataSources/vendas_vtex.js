const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.CONNECTION_STRING || 'postgresql://mydatabase' });
const { sqlQuery } = require('../queries/getSalesByDataRangeQuery');
const dateFormat = 'MM-DD-YYYY';

async function getSalesByDateRange(startDate, endDate){
    return pool.query(sqlQuery.replace('{1}', startDate.format(dateFormat)).replace('{2}', endDate.format(dateFormat)));
}

module.exports = { getSalesByDateRange };
