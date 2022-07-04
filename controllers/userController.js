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
                res.send(
                    {
                        status: true,
                        message:  'new signup',
                        
                    }
                   );
            }
            else{
                res.send({
                    status: false,
                    message: 'No Body'});
            }
        }
        catch(err){
            res.send({
                status: false,
                message:  err
            }
                );
        }
       
    },

    async login_post(req,res){
        try{
            let{
                email, 
                password
            } = req.body;

            var UserData = {
                email,
                password
            };
            let [getUser] = await UserModel.GetUser(UserData);
            console.log(getUser[0].password);
            console.log(UserData.password);
            if(UserData){
                if(UserData.password == getUser[0].password){
                    res.send({
                        status: "true",
                        message: "Logged In successfully",
                        data: getUser,
                    });
                }
                else{
                    res.send({
                        status: "false",
                        message: "Wrong password",
                        //data: getUser,
                    });
                }
            }
            else{
                res.send({
                    status: "false",
                    message: "No such user exist"
                });
            }
            //let [getAllUser] = await UserModel.GetUsers();
        // if(getAllUser){
        //     res.send(getAllUser);
        // }
        // else{
        //     res.send("No Users");
        // }
        //res.send('new login');
        }
        catch(err)
        {
            res.send({
                status: false,
                message:  err
            }
                );
        }
    }

}

module.exports = userController;