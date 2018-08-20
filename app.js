const express = require("express");
const myqsl = require("mysql");
const bodyParser  = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

const connection = myqsl.createConnection({
  host: "localhost",
  user: "root",
  database: "join_us"
});

app.get("/", (req, res) => {

  let query = "select count(*) as total from users";

  connection.query(query, (err, result) => {
    if (err) throw err;
    let count = result[0].total
    res.render('home', {count});
  });
});

app.post('/register', function(req,res){
  let person = {email: req.body.email};

  connection.query('INSERT INTO users SET ?', person, function(err, result) {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Join-Us app listening on port 3000.");
});