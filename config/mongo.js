const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://civo:civo123456@cluster0-2uxls.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("civo").collection("user").find({}, function(err, result) {
    if (err) throw err;
   // console.log(result);
  });
  // perform actions on the collection object
  //console.log(collection);
  client.close();
});



