const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

MongoClient.connect(
  process.env.connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Error in Connection");
    }
    const db = client.db(process.env.databaseName);
    db.collection("users").insertMany([ {
        name: "jiten",
        age: 24,
      },{
        name: "jiten1",
        age: 241,
      }]
     ,
      (error, result) => {
        if (error) {
          return console.log("Error in inserting ");
        }
        console.log(result);
      }
    );
  }
);
