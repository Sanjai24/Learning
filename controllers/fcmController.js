const FCM = require('fcm-node');

var serverKey = require('./server_key.json');

var fcm = new FCM(serverKey);

const fcmController = {
    async token_post(req, res) { 
        try{
            let{ token } = req.body;
            console.log("token generated ----->", token);
            res.send({
                status: true,
                message: `token sent successfully ${token}`,
                });
            return token;
        }
        catch(err){
            console.log("Some ", err);
            res.send({
                status: false,
                message: `err ${err}`,
                });
        }
    }
}
var tokencreated = fcmController.token_post;
console.log("created token ", tokencreated);
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