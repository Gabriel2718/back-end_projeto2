const { connect } = require('./db');
const users = require('./users.json');

async function configurar(){
    try{
        const {db, client } = await connect();
        const colecao = db.collection('usuarios');

        colecao.drop();

        for(i = 0; i < users.length; i++){
            await colecao.insertOne({
                user: users[i]['user'],
                pass: users[i]['pass']
            });
        }
    } catch(error) {
        console.log(error);
    }
}

module.exports = { configurar };