const roleModel = require('../models/role');
const dotenv = require('dotenv');
const connectionDb = require('../database');

dotenv.config({ path: 'backend/config/config.env' });

connectionDb.connect();

const createRoles =  async () => {
    try{
        //check for existing roles
        const count =  await roleModel.estimatedDocumentCount();
        console.log(count);
        if(count > 0) return;
        const values =  Promise.all ([
            new roleModel({name: "user"}).save(),
            new roleModel({name: "admin"}).save(),
            new roleModel({name: "moderator"}).save()
        ]);
        console.log('roles Created');
        process.exit();
    }catch(err){
        console.log(err);
        process.exit();
    }
}
createRoles();