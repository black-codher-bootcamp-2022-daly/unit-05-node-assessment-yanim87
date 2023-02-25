<<<<<<< HEAD
// require('dotenv').config();
// const fs = require('fs');
// const express = require('express');
// const app = express();
// const path = require('path');
// const port = 8080;
// const bodyParser = require('body-parser');
// const { v4: uuidv4 } = require('uuid');
// const todoFilePath = process.env.BASE_JSON_PATH;
// const err = console.error();


// //Read todos from todos.json into variable
// let todos = require(__dirname + todoFilePath);

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.raw());
// app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (_, res) => {
  
//   res.sendFile("./public/index.html", { root: __dirname });
//   console.log(err);
//   // res.status(200).end();
// });
require('dotenv').config();
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const port = 8080;
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { doesNotMatch } = require('assert');
const todoFilePath = process.env.BASE_JSON_PATH;


//Read todos from todos.json into variable todos
const todos = require(__dirname + todoFilePath);

=======
require("dotenv").config();
const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const todoFilePath = process.env.BASE_JSON_PATH;

>>>>>>> 13865b469f544da55f0db7bd5c85f9931a4c41af
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => {
  res.sendFile("./public/index.html", { root: __dirname }, (err) => {
    console.log(err);
  });

});

<<<<<<< HEAD
app.get('/todos', (_, res) => {
  
=======
app.get("/todos", (_, res) => {
  /*
>>>>>>> 13865b469f544da55f0db7bd5c85f9931a4c41af
  res.header("Content-Type","application/json");
   res.sendFile(todoFilePath, { root: __dirname });
  console.log(todos);

  res.status(501).end();
});

//Add GET request with path '/todos/overdue'

//Add GET request with path '/todos/completed'

//Add POST request with path '/todos'

//Add PATCH request with path '/todos/:id

//Add POST request with path '/todos/:id/complete

//Add POST request with path '/todos/:id/undo

//Add DELETE request with path '/todos/:id

module.exports = app;
