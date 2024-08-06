import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const TDL = () => {
    const [data,setData]=useState("");
    const[list,setList]=useState([]);
    const changeHandler=(e)=>
        {
            setData(e.target.value);
        }
    const addHandler=()=>
        {
            setList((preval)=> { 
                return [...preval,data]
                
                
        })
        setData('');
        }
        const deleteHandler = (index) => {
            const newTodos = [...list];
            newTodos.splice(index, 1);
            setList(newTodos);

          };
        

  return (
    <div className='flex  justify-center'>
    
         <h1 className='1'>TO-DO-LIST-APP</h1>
         <div>
         <label for="Task">Enter Task</label>
        <input type="text" className='border-blue-500 p-2 m-10' placeholder='enter the task'  onChange={changeHandler}/>
        <button onClick={addHandler}><AddIcon /></button>
        <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => deleteHandler(index)}><RemoveIcon/></button>
          </li>
        ))}
      </ul>
       
        </div>

        
        </div>
  
  )
}

export default TDL