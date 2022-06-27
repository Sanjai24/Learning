const UserModel = require("../models/userModel");

const userController = {
    async signup_get(req,res){
        res.render('signup');
    },

    async login_get(req,res){
        res.render('login');
    },

    async signup_post(req,res){
        try{
            let{
                email,
                password
            } = req.body;

            var UserData = {
                email,
                password
            };
            
            if(UserData){
                let [User] = await UserModel.CreateUser(UserData);
                res.send('new signup');
            }
            else{
                res.send('No Body');
            }
        }
        catch(err){
            res.send(err);
        }
       
    },

    async login_post(req,res){
        let [getAllUser] = await UserModel.GetUsers();
        if(getAllUser){
            res.send(getAllUser);
        }
        else{
            res.send("No Users");
        }
        res.send('new login');
    }

}

module.exports = userController;