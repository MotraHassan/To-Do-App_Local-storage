let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

//Empty Array To Store The Task
let  arrayOfTasks =[];
// Check if theres tasks in local storage
if(localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}

getDataFromLocalStorage();

//Add Task
submit.onclick = function(){
    if( input.value != ""){
        addTaskToArray(input.value);
        input.value= "";
        
    }
};

// Click on Task Element
tasksDiv.addEventListener("click", (e) =>{
    // Delete Button
    if(e.target.classList.contains("del")){
       
        //Remove Element Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
         //Remove Element From Page
         e.target.parentElement.remove();
    }
    //Task Element
    if(e.target.classList.contains("task")){
        // Toggle Comleted For The Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        // Toggle Done Class
        e.target.classList.toggle("done")
    }

});


function addTaskToArray(taskText){
    // Task Data
const task ={
    id: Date.now(),
    title:taskText,
    completed: false,
};
// Push Task Array Of tasks
arrayOfTasks.push(task)
// Add Tasks To Page
addElementsToPageFrom(arrayOfTasks);
 // Add Tasks To Local Storage
 addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks){
    // Empty Tasks Div
    tasksDiv.innerHTML="";
    //Looping On Array Of Tasks
    arrayOfTasks.forEach((task)=>{
        // Create Main Div
        let div = document.createElement("div");
        div.className = "task";
        //Check If Task is Done
        if(task.completed){
            div.className = "task done"
        }
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));
        // create delete button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        //Append Button to Main Div
        div.appendChild(span);
        // Add Task Div To Tasks Container
        tasksDiv.appendChild(div);
    });
}

function addDataToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if (data){
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId){
   arrayOfTasks = arrayOfTasks.filter((task)=> task.id != taskId);
   addDataToLocalStorageFrom(arrayOfTasks)
}

function toggleStatusTaskWith(taskId){
    for (let i = 9; i< arrayOfTasks.length; i++){
        if (arrayOfTasks[i].id== taskId){
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed) = true: (arrayOfTasks[i].completed) = false
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}