const { faker } = require('@faker-js/faker');
const express = require('express')
const mysql = require('mysql2');
const app = express();
const path = require("path");
const methodOverride = require('method-override');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'node',
  password: 'Vinit@2006'
});
let createRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};


// "/"request
app.get("/", (req, res) => {
  let q = `SELECT COUNT(*) FROM user`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["COUNT(*)"];
      console.log(count);
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("SOME ERROR IN DATABASE");
  }
});

//Show Route
app.get("/user",(req,res)=>{
  let q = `SELECT * FROM user`;
   try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      res.render("showuser.ejs",{users});
    });
  } catch (err) {
    console.log(err);
    res.send("SOME ERROR IN DATABASE");
  }
});


//Edit route
app.get("/user/:id/edit",(req,res)=>{
    let {id}= req.params;
    
    let q=`SELECT * FROM user WHERE id='${id}'`;
    try {
    connection.query(q, (err, result) => {
    if (err) throw err;
    let user= result[0];
     res.render("edit.ejs",{user});
    });
  } catch (err) {
    console.log(err);
    res.send("SOME ERROR IN DATABASE");
  }
});

//update path
app.patch("/user/:id",(req,res)=>{
    let {id}= req.params;
    let {password:formPass, username: newUsername}=req.body;
    let q=`SELECT * FROM user WHERE id='${id}'`;

    try {
    connection.query(q, (err, result) => {
    if (err) throw err;
    let user= result[0];
    if(formPass!=user.password){
      res.send("Wrong password")
    }
    else{
      let q2=`UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
      connection.query(q2,(err, result)=>{
        if (err) throw err;
        res.redirect("/user");
      })
    }
    
    });
  } catch (err) {
    console.log(err);
    res.send("SOME ERROR IN DATABASE");
  }
});


//ADD path
app.get("/user/new", (req, res) => {
  res.render("add.ejs"); 
});

app.post("/user",(req,res)=>{
  let {username, email, password}=req.body;
  let id = faker.string.uuid();
  let q=`INSERT INTO user(id,username,email,password) VALUES (?,?,?,?)`;
  try {
  connection.query(q, [id, username, email, password], (err, result) => {
    if (err) throw err;
    res.redirect("/user");
  });
} catch (err) {
  console.log("caught", err);
  res.send("error");
}
});

//delete route
app.get("/user/:id/delete",(req,res)=>{
    let {id}= req.params;
    
    let q=`SELECT * FROM user WHERE id='${id}'`;
    try {
    connection.query(q, (err, result) => {
    if (err) throw err;
    let user= result[0];
     res.render("delete.ejs",{user});
    });
  } catch (err) {
    console.log(err);
    res.send("SOME ERROR IN DATABASE");
  }
});

app.delete("/user/:id",(req,res)=>{
  let {id}= req.params;
  let {email, password}=req.body;
  let q= `SELECT * FROM user WHERE id=?`;
  connection.query(q,[id],(err, result)=>{
   if (err) throw err;
       let user= result[0];

   if(user.email!==email||user.password!==password){
    res.send("INVALID CREDENTIALS");
   }
   else{
    let q2=`DELETE FROM user WHERE id=?`;
    connection.query(q2,[id],(err,result)=>{
      if (err) throw err;
      res.redirect("/user");
    });
   }
  });
});

//


app.listen("8080", () => {
  console.log("Server Running to Port 8080");
});
// let q = "INSERT INTO user (id,username,email,password) VALUES ?";

// let data = [];

// for (let i = 1; i <= 100; i++) {
//   data.push(createRandomUser());
// }

// try {
//   connection.query(q, [data], (err, res) => {
//     if (err) throw err;
//     console.log(res);
//   });
// } catch (err) {
//   console.log(err);
// }