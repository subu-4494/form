var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://127.0.0.1:27017/mydb');

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));
app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var country = req.body.country;
    var gender = req.body.gender;
    var hobbies = req.body.hobbies;
    var data = {
        "name": name,
        "email": email,
        "mobile": mobile,
        "country": country,
        "gender": gender,
        "hobbies": hobbies
    }
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) throw err;
        console.log("Record Inserted Successfully");
    });
    return res.redirect('confirmation.html');

})

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('form.html');

}).listen(3000);

console.log("Listening on Port 3000");