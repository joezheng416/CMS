const mongoose = require("mongoose");

const connectToDB =() => { 
    const connectionString = process.env.CONNECTION_STRING;
    console.log(`connecting to DB ${connectionString}`);
    if(!connectionString) {
        console.error("connnection string is undefined");
        process.exit(1);
    }
    const db = mongoose.connection;
    db.on("error",(error)=>{
        console.log(error);
        process.exit(2);
    })
    db.on("connected",()=>{
        console.log("DB connected");
    })
    db.on("disconnected",()=>{
        console.log("DB disconnected");
    })
    return mongoose.connect(connectionString);
}

module.exports = {connectToDB};
