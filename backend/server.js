const express = require("express");
const app = express();
const port = 8000;

app.use(express.json());

const cors = require("cors");
app.use(cors());

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "donotforgetSQL",
  database: "DBUI",
});

connection.connect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/", (req, res) => {
  res.send("posted");
});
app.put("/parse", (req, res) => {
  console.log(req.body);

  try {
    const body = req.body;
    const name = body["first"] + " " + body["last"];
    const age = body["age"];
    const isAdmin = body["admin"] ? "is an admin" : "is not an admin";
    const message = `${name} is ${age} years old and ${isAdmin}`;
    res.status(200);
    res.send(message);
  } catch (err) {
    console.log(err);
  }
});

app.get("/db", (req, res) => {
  connection.query("SHOW TABLES", (err, rows, fields) => {
    if (err) throw err;

    console.log(rows);
    res.status(200);
    res.send(rows);
  });
});

app.post("/users", (req, res) => {
  const { username, password, admin } = req.body;
  const query = `INSERT INTO users (username, password, admin) VALUES ('${username}', '${password}', ${admin})`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send(rows);
  });
});

app.get("/users", (req, res) => {
  connection.query(`SELECT * FROM users;`, (err, rows, fields) => {
    if (err) throw err;

    res.status(200);
    res.send(rows);
  });
});
app.get("/users/username/:username", (req, res) => {
  let name = req.params.username;
  connection.query(
    `SELECT * FROM users U WHERE U.username='${name}'`,
    (err, rows, fields) => {
      if (err) throw err;
      res.status(200);
      res.send(rows);
    }
  );
});
app.put("/users/clear", (req, res) => {
  connection.query(`DELETE FROM users;`, (err, rows, fields) => {
    if (err) throw err;

    res.status(200);
    res.send("Successfully cleared users!");
  });
});

//POSTS
//*************************************************************/
app.post("/posts", (req, res) => {
  const { author, title, content, parent, garage } = req.body;
  console.log("creating post from" + author);
  const query = `INSERT INTO posts (author, title, content, garage) VALUES ('${author}', '${title}', '${content}', '${garage}')`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send("created post");
  });
});
app.get("/posts", (req, res) => {
  const query = `SELECT * FROM posts`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send(rows);
  });
});
app.get("/posts/:id", (req, res) => {
  let id = req.params.id;
  const query = `SELECT * FROM posts P WHERE P.post_id=${id}`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send(rows);
  });
});
app.get("/posts/author/:username", (req, res) =>{
  const username = req.params.username
  const query = `SELECT * FROM posts P WHERE P.author='${username}'`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send(rows);
  });
})
app.get("/posts/garage/:name", (req, res) => {
  const name = req.params.name;
  const query = `SELECT * FROM posts P WHERE P.garage='${name}'`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send(rows);
  });
});
app.get("/comments/:id", (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM comments C WHERE C.post_id=${id}`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send(rows);
  });
});
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM posts P WHERE P.post_id=${id}`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send(rows);
  });
})

//GARAGES
//*************************************************************/
app.get("/garages", (req, res)=>{
  const query = `SELECT * from garages`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send(rows);
  });
})
app.get("/garages/:name", (req, res) => {
  const name = req.params.name;
  const query = `SELECT * from garages G where G.name='${name}'`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send(rows);
  });
});
app.post("/garages", (req, res) => {
  const { name, creator, description } = req.body;
  const query = `INSERT INTO garages (name, creator, description) VALUES ('${name}', '${creator}', '${description}')`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send(name + " created");
  });
});
app.get('/memberships/user/:username', (req, res)=>{
  const username = req.params.username;
  const query = `SELECT garage_name FROM memberships M WHERE M.username='${username}'`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send(rows)
  });
})
app.post('/memberships', (req, res)=>{
  const {garage, username} = req.body;
  const query = `INSERT INTO memberships (garage_name, username) VALUES ('${garage}', '${username}')`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
  });
})


app.delete('/posts/garage/:name', (req, res)=>{ 
  const name = req.params.name;
  const query = `DELETE FROM posts P WHERE P.garage='${name}';`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send("deleted " + name)
  })
})

app.delete('/garages/:name', (req, res)=>{ 
  const name = req.params.name;
  const query = `DELETE FROM garages G WHERE G.name='${name}';`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send("deleted " + name)
  })
})

app.delete('/memberships/garage/:name', (req, res)=>{ 
  const name = req.params.name;
  const query = `DELETE FROM memberships M WHERE M.garage_name='${name}';`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send("deleted " + name)
  })
})

//WHY DOES app.delete NOT WORK HERE???????????????????
//it works :))))
app.delete('/memberships', (req, res)=>{
  const {garage, username} = req.body;
  console.log("deleting" + username + " from " + garage)
  const query = `DELETE FROM memberships M WHERE M.garage_name='${garage}' AND M.username='${username}'`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send("removed" + username + " from " + garage)

  });
})
//LIKES
//*************************************************************/
app.put("/rating/:post/:id/", (req, res) => {
  const {action} = req.body;
  const id = req.params.id;
  if (action == "like"){
    const query = `UPDATE posts SET rating=rating+1 WHERE post_id=${id}`
    connection.query(query, (err, rows, fields) => {
      if (err) throw err;
      res.status(200);
      res.send(rows);
    });
  }
})
//COMMENTS
//*************************************************************/
app.post("/comments", (req, res) => {
  const { post_id, author, parent, content } = req.body;
  const query = `INSERT INTO comments (post_id, author, parent, content) VALUES (${post_id}, '${author}', ${parent}, '${content}')`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send(rows);
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
