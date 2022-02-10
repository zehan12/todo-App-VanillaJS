let input = document.querySelector("input[type='text']");

let root = document.querySelector("ul");

let all =document.querySelector(".all_items");
let active =document.querySelector(".active_items");
let completed = document.querySelector(".completed_items") 
let clear = document.querySelector(".clear_completed");

let todos = localStorage.getItem('todos')
 ? JSON.parse(localStorage.getItem('todos'))
 : [] ;

function addToDO(event){
    if(event.keyCode === 13 && event.target.value){
          todos.push({
              name: event.target.value,
              isDone: false
          })
          event.target.value=""
          createUI(todos, root);
          getNumberOfCompletedTodo();
          localStorage.setItem("todos", JSON.stringify(todos))
    }
}
input.addEventListener('keyup',addToDO)

function deleteTodo(event){
    todos.splice(event.target.dataset.id,1);
    createUI(todos, root);
    getNumberOfCompletedTodo();
    toggleClearButton();
    localStorage.setItem("todos", JSON.stringify(todos))
}

function handleChange(event){
    let id = event.target.dataset.id
    todos[id].isDone = !todos[id].isDone;
    createUI(todos, root);
    getNumberOfCompletedTodo();
    toggleClearButton();
    localStorage.setItem("todos", JSON.stringify(todos))
}


// creating whole UI
function createUI(allTodo = todos, rootElement){
    root.innerHTML = ""

   allTodo.forEach( (todo, index) => {
    let li = document.createElement("li");
    li.classList.add('li')

    let checkbox = document.createElement('input')
    checkbox.setAttribute('type','checkbox')
    checkbox.setAttribute('data-id',index)
    checkbox.checked = todo.isDone;
    checkbox.addEventListener('change', handleChange)

    let span = document.createElement('span')
    span.innerText = todo.name;
    span.classList.add('todo-name') 

    let button = document.createElement('button')
    button.innerText ='X';
    button.classList.add('cross-btn');
    button.setAttribute("data-id",index)
    button.addEventListener('click',deleteTodo)

    li.append(checkbox,span,button)

    rootElement.append(li) 
   })
}

// left items 
function getNumberOfCompletedTodo(){
    document.querySelector(".left_items_data")
    .innerText = todos.reduce( (acc, todo)=>{
        if(!todo.isDone){
            return ++acc
        }
        return acc;
    },0)
}

// all items 
all.addEventListener('click',function(){
    createUI(todos, root);
    updateActiveButton("all");
})

// creating active items UI 

active.addEventListener('click',function(){
    let tempArray= todos.filter( (todo) => {
        return !todo.isDone;
      })
      createUI(tempArray, root);
      updateActiveButton("active");
})

// creating completed todos UI

completed.addEventListener('click',function(){
    let tempArray= todos.filter( (todo) => {
        return todo.isDone;
      })
      createUI(tempArray, root);
      updateActiveButton("completed")
})

// clearing completed

clear.addEventListener('click',function(){
    todos = todos.filter((todo)=>{
        return !todo.isDone;
    })// assigning todos a new uncompleted list of todos
    createUI(todos, root)
    localStorage.setItem("todos", JSON.stringify(todos)) 
})

// let current
// function donotSwitch(){

// }

function toggleClearButton(){
   let isTrue = todos.some(todo =>{
        return todo.isDone;
    })
    if(isTrue){
        clear.classList.add('show')
    }else{
        clear.classList.remove('show')
        clear.classList.add('hide')
    }

}
toggleClearButton();

function updateActiveButton(btn){
    all.classList.remove('selected');
    active.classList.remove('selected')
    completed.classList.remove('selected')
    if(btn === "all"){
        all.classList.add('selected')
    }
    if(btn ==="active"){
        active.classList.add('selected')
    }
    if(btn === "completed"){
        completed.classList.add('selected')
    }
}


all.classList.add('selected')
createUI(todos, root);
getNumberOfCompletedTodo();