import React, { Fragment, useState } from 'react'

const CreateTodo = () => {
    const [description, setDescription] = useState('');

const onSubmitForm = async (e) => {
    e.preventDefault();
    try{
        const body = {description}
        const response = await fetch('http://localhost:3001/api/todos', {
           method: "POST",
           headers: {"Content-Type" : "application/json"},
           body:  JSON.stringify(body)
        }) 
       console.log(response);
    //    console.log("dxfcghjk");
       window.location = "/"
    }
    catch(err) {
        console.log(err);
    }
}

  return (
    <Fragment>
        <h1 className='text-center mt-5'>TODO project</h1>
        <form className='d-flex mt-5'>
        <input type='text'value={description}  className='form-control ' onChange={(e) => setDescription(e.target.value)} />
        <button type='submit' onClick={onSubmitForm} className='btn'>ADD</button>

        </form>
    </Fragment>
  )
}

export default CreateTodo