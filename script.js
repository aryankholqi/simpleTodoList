let textInput = document.getElementById("todo-input")
let addTodoBtn = document.querySelector(".add-todo")
let clearListBtn = document.querySelector(".clear-todoList")
let todoListBox = document.querySelector(".todo-list-content")
let todoArray = []
function addNewTodoHandler() {
    if (textInput.value) {
        let todoName = textInput.value
        let newTodoBox = document.createElement("div")
        newTodoBox.classList.add("todo-box")
        let newTodoName = document.createElement("span")
        newTodoName.innerHTML = todoName
        let newTodoControls = document.createElement("div")
        let completeBtn = document.createElement("button")
        completeBtn.innerHTML = "Complete"
        let deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = "Delete"
        completeBtn.classList.add("btn","btn-success","complete-todo")
        deleteBtn.classList.add("btn","btn-danger","delete-todo")
        completeBtn.addEventListener("click",completeTodoHandler)
        deleteBtn.addEventListener("click",deleteTodoHandler)
        newTodoControls.append(completeBtn,deleteBtn)
        newTodoBox.append(newTodoName,newTodoControls)
        todoListBox.appendChild(newTodoBox)
        if (JSON.parse(localStorage.getItem("todos"))) {
            let newTodoArray = JSON.parse(localStorage.getItem("todos"))
            newTodoArray.push({
                content:newTodoName.innerHTML,
                status:"Incomplete"
            })
            localStorage.setItem("todos",JSON.stringify(newTodoArray))
        } else {
            todoArray.push({
                content:newTodoName.innerHTML,
                status:"Incomplete"
            })
            localStorage.setItem("todos",JSON.stringify(todoArray))
        }
        textInput.value = ""
    }
}
let isComplete = false
function completeTodoHandler(event) {
    let newTodoArray = JSON.parse(localStorage.getItem("todos"))
    newTodoArray.forEach(function(todo){
        if (todo.content === event.target.parentElement.previousSibling.innerHTML) {
            todo.status = event.target.innerHTML
        }
    })
    localStorage.setItem("todos",JSON.stringify(newTodoArray))
    event.target.parentElement.previousSibling.classList.toggle("mark-todo")
    if (isComplete) {
        isComplete = false
        event.target.innerHTML = "Complete"
    } else {
        isComplete = true
        event.target.innerHTML = "Incomplete"
    }
}
function deleteTodoHandler(event) {
    let newTodoArray = JSON.parse(localStorage.getItem("todos"))
    let deletedTodoIndex = newTodoArray.findIndex(function(todo) {
        return todo.content === event.target.parentElement.previousSibling.innerHTML
    })
    newTodoArray.splice(deletedTodoIndex,1)
    localStorage.setItem("todos",JSON.stringify(newTodoArray))
    event.target.parentElement.parentElement.remove()
}
function clearTodoListHandler(event) {
    while(todoListBox.firstChild) {
        todoListBox.removeChild(todoListBox.firstChild)
    }
    localStorage.removeItem("todos")
}
function loadPageHandler() {
    let todoArrayParsing = JSON.parse(localStorage.getItem("todos"))
    if (todoArrayParsing) {
        todoArrayParsing.forEach(function(todo) {
        let newTodoBox = document.createElement("div")
        newTodoBox.classList.add("todo-box")
        let newTodoName = document.createElement("span")
        newTodoName.innerHTML = todo.content
        let newTodoControls = document.createElement("div")
        let completeBtn = document.createElement("button")
        let deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = "Delete"
        completeBtn.classList.add("btn","btn-success","complete-todo")
        deleteBtn.classList.add("btn","btn-danger","delete-todo")
        completeBtn.addEventListener("click",completeTodoHandler)
        deleteBtn.addEventListener("click",deleteTodoHandler)
        newTodoControls.append(completeBtn,deleteBtn)
        newTodoBox.append(newTodoName,newTodoControls)
        todoListBox.appendChild(newTodoBox)
        if (todo.status==="Incomplete") {
            completeBtn.innerHTML = "Complete"
            completeBtn.parentElement.previousSibling.classList.remove("mark-todo")
        } else {
            completeBtn.innerHTML = "Incomplete"
            completeBtn.parentElement.previousSibling.classList.add("mark-todo")
        }
    })
    }
    
}
addTodoBtn.addEventListener("click",addNewTodoHandler)
textInput.addEventListener("keydown",function(event){
    if(event.key === "Enter") {
        addNewTodoHandler()
    }
})
clearListBtn.addEventListener("click",clearTodoListHandler)
window.addEventListener("load",loadPageHandler)