const inputValue = document.querySelector('.input')
const submitButton = document.querySelector('.submit-btn')
const todos = document.querySelector('.todos')


submitButton.addEventListener('click', addItems)

function addItems(e){
    e.preventDefault()
    let todo = inputValue.value
    if (todo != ''){
        todos.innerHTML += `<div class='todo-container'>
            <div class="todoList">${todo}</div>
            <button class='check'><i class="fas fa-check-square"></i></button>
            <button class='delete'><i class="fas fa-trash"></i></button>
        </div>
        `
        saveTodo(todo)
        
        todo= ''
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
            })
        }
    }
    
}

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



