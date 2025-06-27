const mongodb = require('mongodb');

const url = 'mongodb://localhost:27017';

const dbName = 'page';

async function connect() {
    const client = new mongodb(url);

    await client.connect();
    const db = client.db(dbName);

    return {db, client};
}

module.exports = { connect };