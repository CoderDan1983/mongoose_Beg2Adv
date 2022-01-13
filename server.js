
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(path.join(__dirname, './')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('dotenv').config();
//---------------------------------------------------------
const mongoose = require("mongoose");
const User = require('./User');

const databaseAddress = "mongodb+srv://social_guy:" + process.env.MONGO_PASSWORD + "@cluster0.lnbce.mongodb.net/MongooseStudy?retryWrites=true&w=majority"
 || 'mongodb://localhost/mern_authenticate_me';
mongoose.connect(databaseAddress, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
	console.log('connected to database!')
});

async function run(){
  try {
    //const user3 = await User.findById("61df065e4c756f0448952759");
    //const user0 = await User.find( { name: "Dwayne Jong" });
    const user = await User.findOne( { name: "Dwayne Jong" });
    //const user = await User.findByName("DWAYNE Jong")
    //const user = await User.find().byName("DWayne Jong");

    //user.sayHi();
    //const user2 = await User.exists( { name: "Dwayne Jong" });
    //.deleteOne, .deleteMany
    //const user = await User.where("name").equals("Dwayne Jong")
    //.where("age").gt(30)
    //.where("age").lt(100)
    //.populate("bestFriend")
    //.limit(1)
    //.select("email");
    //user[0].bestFriend = "61df05c260ca6f104c3a564f";
    //await user[0].save();

    /*const user = await User.create({ 
      name: "Cheech N Chong", 
      age: 51,
      email: "420OneMoreTime@GMAIL.com",
      hobbies: ["doing... stuff", "other stuff too"],
      address: {
        street: "420 Smoke Way",
      },
    });*/
    //user.name = "Wreck King Crews";
    //await user.save();

    //const user = new User({ name: "Kyle", age: 26 })
    //await user.save().then(() => console.log("User Saved"));
    console.log(user);
    await user.save();
    console.log(user);
    console.log('..............');
    console.log(user.namedEmail);
  }
  catch (e) {
    console.log(e.message);
  }
}
run();

//user.save().then(() => console.log("User Saved"));





app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});