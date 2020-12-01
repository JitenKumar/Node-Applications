const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://localhost:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Error in Connection");
    }
    const db = client.db(databaseName);
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
