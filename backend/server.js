const express = require('express')
const app = express()
const port = 8000

app.use(express.json())

const cors = require('cors');
app.use(cors()) 

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'donotforgetSQL',
  database: 'DBUI'
})

connection.connect()

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/', (req, res) =>{
    res.send("posted")
})
app.put('/parse', (req, res) => {
    console.log(req.body)

    try {
        const body = req.body
        const name = body["first"] + " " + body["last"]
        const age = body["age"]
        const isAdmin = body["admin"] ? "is an admin" : "is not an admin"
        const message = `${name} is ${age} years old and ${isAdmin}`
        res.status(200)
        res.send(message)
    } catch (err) {
        console.log(err)
    }
})

app.get('/db', (req, res) => {
    connection.query('SHOW TABLES', (err, rows, fields) =>{
        if (err) throw err

        console.log(rows)
        res.status(200)
        res.send(rows)
    })
})

app.post('/users', (req, res) => {
    const { username, password, admin } = req.body
    const query = `INSERT INTO users (username, password, admin) VALUES ('${username}', '${password}', ${admin})`
    connection.query(query, (err, rows, fields) => {
        if (err) throw err
        res.status(200)
        res.send(rows)
    })
})

app.get('/users', (req, res) => {
    connection.query(`SELECT * FROM users;`, (err, rows, fields) => {
        if (err) throw err

        res.status(200)
        res.send(rows)
    })
})
app.get('/users/username/:username', (req, res)=>{
    let name = req.params.username;
    connection.query(`SELECT * FROM users U WHERE U.username='${name}'`, (err, rows, fields)=>{
        if (err) throw err
        res.status(200)
        res.send(rows)
    })
})
app.put('/users/clear', (req, res) => {
    connection.query(`DELETE FROM users;`, (err, rows, fields) => {
        if (err) throw err

        res.status(200)
        res.send("Successfully cleared users!")
    })
})

//POSTS
//*************************************************************/
app.post('/posts', (req, res)=>{
    const {author, title, content, parent} = req.body;
    const query = `INSERT INTO posts (author, title, content, parent) VALUES (${author}, ${title}, ${content}, ${parent})`
    connection.query(query, (err, rows, fields)=>{
        if(err) throw err;
        res.status(200)
        res.send("created post")
    })
})
app.get('/posts', (req, res)=>{
    const query = `SELECT * FROM posts P WHERE P.parent IS NULL`
    connection.query(query, (err, rows, fields)=>{
        if(err) throw err
        res.status(200)
        res.send(rows)
    })
})
app.get('/posts/garage/:id', (req, res)=>{
    const id = req.params.id
    const query = `SELECT * FROM posts P WHERE P.parent IS NULL AND P.garage=${garage}`
    connection.query(query, (err, rows, fields)=>{
        if(err) throw err
        res.status(200)
        res.send(rows)
    })
})
app.get('/posts/author/:id', (req,res)=>{
    const id = req.params.id;
    const query = `SELECT * FROM posts P WHERE P.author=${id}`
    connection.query(query, (err, rows, fields)=>{
        if(err) throw err
        res.status(200)
        res.send(rows)
    })
})
app.get('/comments/:id', (req,res)=>{
    const id = req.params.id;
    const query = `SELECT * FROM comments C WHERE C.post_id=${id}`
    connection.query(query, (err, rows, fields)=>{
        if(err) throw err
        res.status(200)
        res.send(rows)
    })
})
//GARAGES
//*************************************************************/

//COMMENTS
//*************************************************************/
app.post('/comments', (req,res)=>{
    const {post_id, author, parent, content} = req.body;
    const query = `INSERT INTO comments (post_id, author, parent, content) VALUES (${post_id}, '${author}', ${parent}, '${content}')`
    connection.query(query, (err, rows, fields)=>{
        if(err) throw err
        res.status(200)
        res.send(rows)
    })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
