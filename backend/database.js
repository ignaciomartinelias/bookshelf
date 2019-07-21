const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL , {useNewUrlParser: true})
    .then(db => console.log("DB is connected"))
    .catch(err => console.log(err));