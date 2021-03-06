var event = require('../config/mongo');
var ObjectId = require('mongodb').ObjectID;

module.exports = {
    create: function(newEvent){
        return event.eventModel.create(newEvent);
        //console.log(user.userModel);
    },

    findEventById: function(eventId){
        return event.eventModel.find({_id:ObjectId(eventId)});
    },  

    getAllEvents: function(){
        return event.eventModel.find({});
    },

    deleteEvent: function(eventId){
        return event.eventModel.deleteOne({
            _id:ObjectId(eventId)
        })
    }

}