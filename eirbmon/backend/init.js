const mongooseconnection = require("mongoose");
mongooseconnection.connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true
});
const connection = mongooseconnection.connection;
connection.once("open", function() {
    console.log("MongoDB connected successfully")
    connection.db.listCollections().toArray(function(err, names) {
        if (err) {
            console.log(err);
        } else {
                    mongooseconnection.connection.db.dropDatabase()
        }
    });
});
