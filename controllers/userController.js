const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");    
const moment = require('moment');

const maxAge = 3*24*60*60;

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
                let [Det] = await UserModel.GetUser(UserData);
                console.log(Det);
            
            id = Det[0].user_id;
            if(id){
                var insert_id = {"user_id": id}
                let payload = {
                    "user_id": Det[0].user_id,
                    "email" : Det[0].email,
                    "password": Det[0].password
                }
                let options = {expiresIn: process.env.JWT_EXPIRE_TIME, issuer: process.env.JWT_ISSUER};
                let secret = 'random';
                let token = jwt.sign(payload, secret, options);
                let dd =  Date(moment().add(31, 'days'))
                console.log("dd" + dd);
                const cookieOptions = {
                    httpOnly: true, 
                    expires: new Date(moment().add(31, 'days')),
                    overwrite: true
                };
                
                res.cookie('x-access-token', token, cookieOptions);
                console.log("------------->", token);
                res.send({
                    status: true,
                    message: 'Registration Successful',
                    data: payload,
                    token: token
                });
            }
            else{
                res.send({
                    status: false,
                    message: 'No User created',
                    });
            }
           
            }
            
            else{
                res.send({
                    status: false,
                    message: 'No Body',
                    });
            }
        }
        catch(err){
            console.log(err);
            res.send({
                status: false,
                message:  "None " + err
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
                        status: true,
                        message: "Logged In successfully",
                        data: getUser,
                    });
                }
                else{
                    res.send({
                        status: false,
                        message: "Wrong password",
                        //data: getUser,
                    });
                }
            }
            else{
                res.send({
                    status: false,
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