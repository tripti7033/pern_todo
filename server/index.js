require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const pool = require('./db')

//middleware
app.use(cors())
app.use(express.json())

//Routes//

//create a todo
app.post('/api/todos', async (req, res) => {
    try {
        console.log(req.body);
       const {description} = req.body;
       const newTodo = await pool.query('INSERT INTO todo (description) values($1) RETURNING *', [description])
       res.json(newTodo.rows[0])
    //    console.log(newTodo.rows[0]);
    } catch(err) {
console.error(err);
    }

})
//get all todo
app.get('/api/todos', async (req, res) => {
    const todos= await pool.query("SELECT * FROM todo");
    res.json(todos.rows);
    console.log(todos);
})

//get a todo
app.get('/api/todos/:id', async(req, res) =>{
    const {id} = req.params;
    const todo = await pool.query("select * from todo where id = $1", [id]);
    res.json(todo.rows[0]);
})

//update a todo
app.put('/api/todos/:id', async (req, res) => {
    try{

        const {id} = req.params;
        const {description} = req.body;
        const updatedTodo = await pool.query("UPDATE todo SET description = $1 WHERE id = $2 RETURNING *", [description, id]);
        res.json(updatedTodo.rows[0])
        // console.log("updatedTodo");
    }
    catch(err){
        console.log(err);
    }

})

//delete
app.delete('/api/todos/:id', async (req, res) =>{
    const {id} = req.params;
    const deletedTodo = await pool.query('DELETE FROM todo where id = $1 RETURNING *', [id]);
    res.json(deletedTodo.rows)
})

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})