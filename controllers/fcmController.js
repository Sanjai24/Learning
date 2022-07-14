const FCM = require('fcm-node');

var serverKey = require('./server_key.json');

var fcm = new FCM(serverKey);

const fcmController = {
    async token_post(req, res) { 
        try{
            let{ token } = req.body;
            console("token generated ----->", token);
            return token;
        }
        catch(err){
            res.send(err);
        }
    }
}
var tokencreated = fcmController.token_post;
var message = {
    to: tokencreated,

    notification : {
        title: 'Testing notification',
        body: 'This is to notify that the test is success'
    },
}

fcm.send(message, function(err, response) { 
    if(err){
        console.log('Something is wrong ', err);
    }
    else{
        console.log("Success ", response);
    }
});

module.exports = fcmController;