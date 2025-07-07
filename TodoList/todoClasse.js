/* Esempio classe: creiamo una classe per identificare l'intera lista di todo.
Questa classe avrà un costruttore a cui passeremo l'elemento del dom che fa da contenitore (variabile todoContainer).
Nel costruttore possiamo anche inserire i listeners per barrare i todo già fatti e quello per eliminare un todo dalla lista (possiamo richiamare dei metodi privati, come toggleDone() e removeTodo)
Serve un metodo per aggiungere un nuovo todo (passare il testo come parametro e scrivere la logica per creare un elemento LI nel dom)

suggerimenti per la classe:
  class TodoList
  constructor(il contenitore <ul>) {aggiungo i listeners che richiamano dei metodi}
  addTodo(testo del todo)
  toggleDone(evento) {trovo il target dell'evento (l'elemento <li> che ho cliccato) e attivo/disattivo la sua classe 'done'}
  removeTodo(evento) {trovo il parent del pulsante che ho cliccato (quindi l'elemento <li> che contiene il button) e lo rimuovo dal DOM}
*/
let addButton = document.querySelector('#add-button');
let inputField = document.querySelector('#todo-input');
let todolist = document.querySelector('#todo-list');

class TodoList {
    constructor(containerElement) {
        this.containerElement = containerElement;
        this.containerElement.addEventListener('click', this.#toggleDone);
        this.containerElement.addEventListener('click', this.#deleteTodo);
    }
    addTodo(TodoText) {
        let newTodo = document.createElement('li');
        newTodo.textContent = TodoText;

        let newCloseButton = this.#createCloseButton();

        newTodo.append(newCloseButton);

        todolist.append(newTodo);
    }

    #createCloseButton() {
    let CloseButton = document.createElement('button');
    CloseButton.textContent = 'X';
    CloseButton.classList.add('delete');
    return CloseButton
    }

    #toggleDone(e) {
        if(e.target.tagName === 'LI')
            e.target.classList.toggle('done');
    }
    #deleteTodo(e) {
        if(e.target.tagName === 'BUTTON')
            e.target.parentElement.remove();
    }
}
let todoList = new TodoList(todolist);

addButton.addEventListener('click', () => {
    let TodoText = inputField.value;
    if(TodoText){
        todoList.addTodo(TodoText)
    }
    else(alert('Inserisci un todo'));
    inputField.value = '';
});
inputField.addEventListener('keyup', (event) => {
    let TodoText = inputField.value;
    if (event.key === 'Enter') {
        if (TodoText) {
            todoList.addTodo(TodoText);
            inputField.value = '';
        } else {
            alert('Inserisci un todo');
        }
    }
});