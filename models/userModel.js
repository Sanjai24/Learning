const database = require('../utils/database.js');

const UserModel = {
    async CreateUser(userData){
        let query = `INSERT INTO auth_user(email, password) values('${userData.email}', '${userData.password}' )`;
        return database.promise().query(query);
    },
    async GetUsers(){
        let query = `SELECT * FROM auth_user`;
        return database.promise().query(query);
    }
};

module.exports = UserModel;