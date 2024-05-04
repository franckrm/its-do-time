import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import axios from 'axios'


import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Header from './components/Header'
import TaskDetails from './components/TaskDetails'

import './App.css'
import { SiAnsys } from 'react-icons/si'

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
        
        },
        {
            id: uuidv4(),
            title: 'Teste 1',
            completed:false,
        
        },
        {
            id: uuidv4(),
            title: 'Teste 2',
            completed:false,
        
        }
        
    ])

    useEffect(()=>{
        const feachTasks = async ()=>{
            const {data} = await  axios.get('https://jsonplaceholder.cypress.io/todos?_limit=10')
            setTasks(data);
        }
       
        feachTasks();
        
    }, [])

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

    const handleTaskDeletion = (taskId)=>{
        const newTasks = tasks.filter((task)=> task.id !== taskId);
        setTasks(newTasks);
    }
   
    return (
        <Router>
            <div className="container">
                <Header/>
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <>
                                <AddTask handleTaskAddition={handleTaskAddition}/>
                                <Tasks tasks={tasks} handleTaskClick={handleTaskClick} handleTaskDeletion={handleTaskDeletion}/>
                            </>
                        }
                    /> 
                    <Route 
                        path="/:taskTitle" 
                        element={
                            <>
                               <TaskDetails/>
                            </>
                        }
                    /> 
              

                </Routes> 
            </div>
        </Router>
    )
}

export default App;