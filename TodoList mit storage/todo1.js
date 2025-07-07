let addButton = document.querySelector('#add-button');
let inputField = document.querySelector('#todo-input');
let todolist = document.querySelector('#todo-list');

addButton.addEventListener('click', () => {
    let TodoText = inputField.value;
// console.log(inputField);
// console.dir(inputField);
    if(TodoText){
        addTodo(TodoText)
    }
        else(alert('Inserisci un todo'));
    inputField.value = '';
});
inputField.addEventListener('keyup', (event) => {
    let TodoText = inputField.value;
    if(event.key === 'Enter'){
        // console.log('Enter key pressed');
        addTodo(TodoText);
        inputField.value = '';
    }
    // console.log(event)
    // console.log(event.key)
});
function addTodo() {
let newTodo = document.createElement('li');
// newTodo.innerHTML = inputField.value;    // rischio sicurezza
newTodo.textContent = inputField.value;

newTodo.addEventListener('click',function() {
    newTodo.classList.toggle('done');
})

newCloseButton = document.createElement('button');
newCloseButton.textContent = 'X';
newCloseButton.classList.add('delete');

newCloseButton.addEventListener('click', function() {
    let todoToDeleted = this.parentElement;
    todoToDeleted.remove();
})
    newTodo.append(newCloseButton);

// todolist.insertAdjacentElement('afterbegin', newTodo);
// todolist.insertAdjacentElement('beforeend', newTodo);
todolist.append(newTodo);
// todolist.prepend(newTodo);


}

//<img src='x' onerror='alert(1)'>