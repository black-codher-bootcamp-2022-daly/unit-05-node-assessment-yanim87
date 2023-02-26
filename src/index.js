require("dotenv").config();
const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");

const port = 8080;
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const todoFilePath = process.env.BASE_JSON_PATH;
const getTodos = ()=> JSON.parse( fs.readFileSync(__dirname + todoFilePath));



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
});


//Add GET request with path '/todos/overdue'
app.get("/todos/overdue", (req, res) => {
  res.header("Content-Type", "application/json");

  let todos = getTodos();

  let overdue = [];
  let todayDate = new Date();
  todos.forEach((todo) => {
    //   const parse_date = Date.parse(todo.due)
    if (new Date(todo.due) < todayDate && todo.completed === false) {
      overdue.push(todo);
    } 
  });
  res.send(overdue)
});
//Add GET request with path '/todos/completed'

app.get("/todos/completed", (req, res) => {
  const todos = getTodos()
  let completed = []
  const result = todos.filter((item) => item.completed == true);
  res.send(result);
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  const todos = getTodos()
  // console.log(id)
  const matched_id = todos.find((el) => el.id == id);
  if (matched_id) {
    res.send(JSON.stringify(matched_id, null, 2));
  } else {
    res.status(404).end();
  }
});
//Add POST request with path '/todos'
app.post("/todos", (req, res) => {
  const date_and_time = new Date();
  const { name, due } = req.body;

  if (req.body && new Date(due) != "Invalid Date") {
   
    const newTodo = {
      id: uuidv4(),
      name,
      created: date_and_time,
      due,
      completed: false,
    };

    const data = fs.readFileSync(__dirname + todoFilePath);
    let todos = JSON.parse(data);
    todos.push(newTodo);
    todos = JSON.stringify(todos, null, 2);

    fs.writeFile(__dirname + todoFilePath, todos, (err) => {
      if (err) {
        throw err;
      } else {
        res.status(201).end();
      }
    });
  } else {
    res.status(400).end();
  }
});
//Add PATCH request with path '/todos/:id

app.patch('/todos/:id', (req,res) => {
  const id = req.params.id
  const body = req.body
  const data = fs.readFileSync(__dirname + todoFilePath)
  // console.log(Object.keys(body).length)
  // console.log(JSON.parse(data))
  let todos = JSON.parse(data)
  const sameProfile = todos.find((el) => el.id == id);
  // const index = todos.findIndex((el) => el.id == id);
  if(sameProfile){
    // console.log(id)
    const allowed_keys = ['name','due']
    let body_keys = Object.keys(body)

    const portion = []

    body_keys.forEach(key => {
        if(allowed_keys.includes(key)){
            portion.push(key)
        }
    })

    if(portion.length === 0 || (body.due && new Date(body.due) == 'Invalid Date')){
      console.log('here')
      res.status(404).end()
    }
    portion.forEach(result => {
        sameProfile[result] = body[result]
    })

    todos = JSON.stringify(todos, null, 2)

    // console.log(sameProfile)
    
    
    fs.writeFile(__dirname + todoFilePath, todos, (err) => {
      if (err) {
        throw err;
      }})
      res.status(200).end()
  } else {
    res.status(404).end()
  }
})


//Add POST request with path '/todos/:id/complete
app.post("/todos/:id/complete", (req, res) => {
  const id = req.params.id;
  const todos = getTodos()
  // console.log(id)
  const matched_id = todos.find((el) => el.id == id);
  if (matched_id) {
    res.send(JSON.stringify(matched_id, null, 2));
  } else {
    res.status(404).end();
  }
});

//Add POST request with path '/todos/:id/undo


//Add DELETE request with path '/todos/:id

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
 
  let todos = getTodos
  const sameProfile = todos.find((el) => el.id == id);
  if (sameProfile) {
    todos = todos.filter((todo) => todo.id != id);
    
    fs.writeFile(__dirname + todoFilePath, todos, (err) => {
      if (err) {
        throw err;
      }
      res.status(200).end();
    });
  } else {
    res.status(404).end();
  }
});

// app.listen(port, function () {
//   console.log(`Node server is running... http://localhost:${port}`);
// });

module.exports = app;
