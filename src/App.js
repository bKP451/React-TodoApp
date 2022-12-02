import React, {useState} from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App(props) {
  
  const [tasks, setTasks] = useState(props.tasks)

  function addTask(name){
    const newTask = {id:`todo-${nanoid()}`, name, completed:false};
    setTasks([...tasks, newTask]);
  }


  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task)=>{
      
      // if this task has the same id as the edited task
      if(id === task.id){
        // use spread operator to make a new object
        // whose completed prop has been inverted
        return {...task, completed:!task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id){
    const remainingTasks = tasks.filter((task)=>id !== task.id);
    setTasks(remainingTasks);
  }

  const taskList = tasks.map((task) =>
   <Todo 
    id={task.id} 
    name={task.name} 
    completed={task.completed} 
    key={task.id}
    toggleTaskCompleted = {toggleTaskCompleted}
    deleteTask = {deleteTask}
  />);

  // If there is a single task, than task else tasks
  const tasksNoun = (taskList.length !==1 )?("tasks"):("task");
  const remainingTasksHeading = `${taskList.length} ${tasksNoun} Remaining !!`
  return (
    <div className="todoapp stack-large">
      <h1>Pandey's tasks</h1>
      <Form onSubmit={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">
       {remainingTasksHeading}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}


export default App;
