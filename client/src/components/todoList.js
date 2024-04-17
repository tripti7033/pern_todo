import React, { useEffect, useState } from 'react'
import EditTodo from './editTodo'

const TodoList = () => {
const [todos, setTodos] = useState([])

const onDelete = async (id) =>{
    try{
        const response = await fetch(`http://localhost:3001/api/todos/${id}`,{
            method: "DELETE",     
        })
        console.log(response);
        setTodos(todos.filter(todo => todo.todo_id !== id))

    }catch(err){
        console.error(err)
    }

}

useEffect( () => {   
const getTodo = async () =>{
    try{
        const response = await fetch('http://localhost:3001/api/todos')
        const jsonData = await response.json()
        setTodos(jsonData)
        // console.log(jsonData);
    }
    catch(err){
        console.log(err);
    }
}
    getTodo()
}, [])
// console.log("data", todo);
    console.log( "todos",todos);

  return (
    <div>
        <table className="table table-hover">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
    {todos.map(todo => (
        <tr key={todo.todo_id}>
          <td>{todo.description}</td>
          <td><EditTodo todo={todo}/></td>
          <td><button className='btn btn-danger' onClick={() => onDelete(todo.todo_id)}>DELETE</button></td>
        </tr>
    ))}
      </tbody>
    
    {/* <tbody>
      <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>
    </tbody> */}
   
  </table>
    </div>
  )
}

export default TodoList