var event = require('../config/mongo');
module.exports = {
    create: function(newEvent){
        return event.eventModel.create(newEvent);
        //console.log(user.userModel);
    },
    
}