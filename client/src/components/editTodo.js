import React, { useCallback, useState } from 'react'

const EditTodo = ({todo}) => {
    // console.log(todo.description);
    const [description, setDescription] = useState(todo.description);
    // console.log(description);

    const updateTodo = useCallback( async (e) =>{
        e.preventDefault()
        const body = {description}

        try{
            const response = await fetch(`http://localhost:3001/api/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body),
            })
            // setDescription(response)
            console.log(response);
            window.location= '/'
        }catch(err){
            console.log(err);
        }
       
      
    },[description, todo.todo_id])
  return (
    <div>
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
    Edit
  </button>

  <div class="modal fade" id={`id${todo.todo_id}`}>
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
      
        <div class="modal-header">
          <h4 class="modal-title">Edit Todo</h4>
          <button type="button" class="close" data-dismiss="modal"
          onClick={()=>setDescription(todo.description)}
          >&times;</button>
        </div>
        
        <div class="modal-body">
          <input type='text' className='form-control' value={description} onChange={(e)=>setDescription(e.target.value)} />
        </div>
        
        <div class="modal-footer">
          <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={(e) => updateTodo(e)}>Edit</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal"   onClick={()=>setDescription(todo.description)}>Close</button>
        </div>
        
      </div>
    </div>
  </div>
  
    </div>
  )
}

export default EditTodo