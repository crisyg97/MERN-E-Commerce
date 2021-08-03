const roleModel = require('../models/role');
const dotenv = require('dotenv');
const connectionDb = require('../database');

dotenv.config({ path: 'backend/config/config.env' });

connectionDb.connect();

const createRoles =  async () => {
    var values;
    try{
        //check for existing roles
        const count =  await roleModel.estimatedDocumentCount();
        console.log(count);
        if(count > 0) {
            return process.exit();
        }else {
            values =  await Promise.all ([
                new roleModel({name: "user"}).save(),
                new roleModel({name: "admin"}).save(),
                new roleModel({name: "moderator"}).save()
            ]).then((res) => {console.log('roles Created')});
        }
        process.exit();
    }catch(err){
        console.log(err);
        process.exit();
    }
}
createRoles();