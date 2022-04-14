const mongooseconnection = require("mongoose");
mongooseconnection.connect('mongodb+srv://eirbmon:eirbmon@cluster0.9jyvc.mongodb.net/eirbmon?retryWrites=true&w=majority', {
    useNewUrlParser: true
});
const connection = mongooseconnection.connection;
connection.once("open", function() {
    console.log("MongoDB connected successfully")
    connection.db.listCollections().toArray(function(err) {
        if (err) {
            console.log(err);
        } else {
                    mongooseconnection.connection.db.dropDatabase();
                    console.log("Database dropped.");
        }
    });
});
