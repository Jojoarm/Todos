const inputValue = document.querySelector('.input')
const submitButton = document.querySelector('.submit-btn')
const todoItems = document.querySelector('.todos')
const filterTodos = document.querySelector('.filter-todo')

document.addEventListener('DOMContentLoaded', getTodos)
submitButton.addEventListener('click', addItems)
filterTodos.addEventListener('click', filterTodo)


//Add todo items from input
function addItems(e){
    e.preventDefault()
    let todo = inputValue.value
    if (todo != ''){
        todoItems.innerHTML += `<div class='todo-container'>
            <div class="todoList">${todo}</div>
            <button class='check'><i class="fas fa-check-square"></i></button>
            <button class='delete'><i class="fas fa-trash"></i></button>
        </div>
        `
        saveTodo(todo)
        checkTodos()
        inputValue.value = ''
    
}
}

//Save your todo items to local storage so it's stored
function saveTodo(item){
    let todos
    if (localStorage.getItem('todoList')===null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todoList'))
    }
    todos.push(item)
    localStorage.setItem("todoList", JSON.stringify(todos))
}

//Get your stored todo items on each refresh of the page
function getTodos(){
    let todos
    if (localStorage.getItem('todoList')===null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todoList'))
    } 
    for(let i=0; i<todos.length; i++){
        todoItems.innerHTML += `<div class='todo-container'>
            <div class="todoList">${todos[i]}</div>
            <button class='check'><i class="fas fa-check-square"></i></button>
            <button class='delete'><i class="fas fa-trash"></i></button>
        </div>
        `
    }
    checkTodos()
}

//check todo items that has been carried out or items you want to delete
function checkTodos(){
    const checkButton = document.querySelectorAll('.check')
    for (let i=0; i<checkButton.length; i++){
        checkButton[i].addEventListener('click', () => {
            checkButton[i].parentElement.classList.toggle('checked')
        })
    }

    const deleteButton = document.querySelectorAll('.delete')
    for (let i=0; i<deleteButton.length; i++){
        deleteButton[i].addEventListener('click', () => {
            deleteButton[i].parentElement.classList.add('remove')
            removeTodos(deleteButton[i])
        })
    }
}

//Remove deleted todos from local storage
function removeTodos(key){
    let itemKey = key.parentElement.children[0].innerText //Access the div containing the todo item
    let todos
    if (localStorage.getItem('todoList')===null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todoList'))
    } 
    for(let i=0; i<todos.length; i++){
        if (itemKey == todos[i]){
            todos.splice(i, 1)
        }
    }
    localStorage.setItem("todoList", JSON.stringify(todos))
}

//Filter your todo items so you can view items you have completed and those uncompleted
function filterTodo(e){
    const items = todoItems.children;
    for (let i=0; i<items.length; i++){
        switch(e.target.value){
            case "all":
                items[i].style.display = 'flex';
                break;
            case "completed":
                if(items[i].classList.contains('checked')){
                    items[i].style.display = 'flex';
                } else{
                    items[i].style.display = 'none'
                }
                break;
            case 'uncompleted':
                if(!items[i].classList.contains('checked')){
                    items[i].style.display = 'flex';
                } else{
                    items[i].style.display = 'none'
                }
                break;
        }
    }
}