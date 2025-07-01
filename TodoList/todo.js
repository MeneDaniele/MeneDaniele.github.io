let addButton = document.querySelector('#add-button');
let inputField = document.querySelector('#todo-input');
let todolist = document.querySelector('#todo-list');


addButton.addEventListener('click', function() {
    // creazione di if per evitare di inserire todo vuoti
    if(inputField.value === '') {
        alert('Inserisci un todo');
    }
    else {
        // console.log('addButton clicked')
//creazione elemento LI
        let newTodo = document.createElement('li');
        newTodo.textContent = inputField.value;

//pulizia inputField
        inputField.value = '';

//inserimento elemento LI dentro UL
        todolist.insertAdjacentElement('beforeend', newTodo);

//creazione pulsante CLOSE
        let closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        newTodo.appendChild(closeButton);
        closeButton.classList.add('delete');

//aggiungere click listener a closeButton e al click rimuovere il todo
        closeButton.addEventListener('click', function () {
            newTodo.remove();
        });
//aggiungere click listener a newTodo e al click barrare il todo
        newTodo.addEventListener('click', function () {
            newTodo.classList.toggle('done')
        });
    }});

