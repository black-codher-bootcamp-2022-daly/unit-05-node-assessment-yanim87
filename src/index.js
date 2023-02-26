require("dotenv").config();
const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");

const port = 8080;
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const todoFilePath = process.env.BASE_JSON_PATH;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(bodyParser.json());

app.use("/content", express.static(path.join(__dirname, "public")));

//Add GET request with path '/'

app.get("/", (_, res) => {
  res.sendFile("./public/index.html", { root: __dirname }, (err) => {
    console.log(err);
  });

  res.status(200);
});

//Add GET request with path '/todos'

app.get("/todos", (_, res) => {
  res.header("Content-Type", "application/json");
  res.sendFile(todoFilePath, { root: __dirname });

  res.status(200);
});

//Add GET request with path '/todos/overdue'

app.get("/todos/overdue", (req, res) => {
  const date = new Date();
  const profile = JSON.parse(
    fs.readFileSync(path.join(__dirname, "models/todos.json"))
  );
  const result = profile.filter((item) => new Date(item.due) < date);
  res.send(result);
  profile[0].due;
});

//Add GET request with path '/todos/completed'

app.get("/todos/completed", (req, res) => {
  const profile = JSON.parse(
    fs.readFileSync(path.join(__dirname, "models/todos.json"))
  );
  const result = profile.filter((item) => item.completed == true);
  res.send(result);
});
app.get("/todos/", (req, res) => {
  const message = "Hello everybody";
  res.send(message);
}
)

//Add POST request with path '/todos'
app.post('/todos', (_, res) => {
  
  const newTodo ="Turn on central heating";

if (newTodo) {
  res.setHeader("Content-Type", "application/json").status(201).push();
  }
  else {
    res.status(400).send("Bad Request");
  }
});
//Add PATCH request with path '/todos/:id

app.get("/todos/:id", (req, res) => {
  const profile = JSON.parse(
    fs.readFileSync(path.join(__dirname, "models/todos.json"))
  );

  res.send(result);
});
//Add POST request with path '/todos/:id/complete

//Add POST request with path '/todos/:id/undo

app.get("/todos/:id/undo", (req, res) => {
  res.send(message);
});
//Add DELETE request with path '/todos/:id

app.delete("/todos/:01507581-9d12-4c3a-bb60-19d539a11189", (req, res) => {
  const profile = JSON.parse(
    fs.readFileSync(path.join(__dirname, "models/todos.json"))
  );
});

app.listen(port, function () {
  console.log(`Node server is running... http://localhost:${port}`);
});

module.exports = app;