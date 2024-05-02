import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import './App.css'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = ()=> {
    const [tasks, setTasks] = useState([
        {
            id: uuidv4(),
            title: 'Estudar Programação',
            completed:false,
        
        },
        {
            id: uuidv4(),
            title: 'Ler Livros',
            completed:false,
        
        }
        
    ])

    const handleTaskClick = (taskId) =>{
        const newTasks = tasks.map(task=>{
            if (task.id === taskId) return {...task, completed: !task.completed}
            return task
        })
        setTasks(newTasks)
    }

    const handleTaskAddition = (taskTitle)=>{
        const newTasks = [
            ...tasks, 
            {
                title: taskTitle,
                id: uuidv4(),
                completed: false
            }
        ]   

        setTasks(newTasks);
    }
   
    return (
        <>
            <div className="container">
                <AddTask handleTaskAddition={handleTaskAddition}/>
                <Tasks tasks={tasks} handleTaskClick={handleTaskClick}/>
            </div>
        </>
    )
}

export default App;