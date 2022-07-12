const FCM = require('fcm-node');

var serverKey = require('./server_key.json');

var fcm = new FCM(serverKey);

var message = {


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