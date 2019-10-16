const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI;

function connect(url) {
    return MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true } ).then(client => client.db());
}

module.exports = async function() {
    let database = await Promise.all([connect(uri)])
    return {
        database: database[0]
    }
}
