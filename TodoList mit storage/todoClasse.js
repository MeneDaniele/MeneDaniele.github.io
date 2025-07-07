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
import { salvaTodo, leggiTodo } from './TodoStorage.js';

let addButton = document.querySelector('#add-button');
let inputField = document.querySelector('#todo-input');
let todolist = document.querySelector('#todo-list');



class TodoList {
    constructor(containerElement) {
        this.containerElement = containerElement;
        this.todos = leggiTodo();
        if (!Array.isArray(this.todos)) this.todos = [];
        this.#renderTodos();

        this.containerElement.addEventListener('click', (e) => this.#toggleDone(e));
        this.containerElement.addEventListener('click', (e) => this.#deleteTodo(e));
    }

    addTodo(TodoText) {
        this.todos.push({text: TodoText, done: false});
        salvaTodo(this.todos);
        this.#renderTodos();
    }

    /*
        Metodo privato per renderizzare i todo nella lista.
        Pulisce il contenitore e poi aggiunge ogni todo come un elemento <li>.
        Ogni <li> avrà un pulsante di chiusura associato.
    */
    #renderTodos() {
        this.containerElement.innerHTML = '';
        this.todos.forEach((todo, idx) => {
            let newTodo = document.createElement('li');
            newTodo.textContent = todo.text;
            if (todo.done) newTodo.classList.add('done');
            newTodo.dataset.idx = idx;
            let newCloseButton = this.#createCloseButton();
            newTodo.append(newCloseButton);
            this.containerElement.append(newTodo);
        });
    }


    #createCloseButton() {
        let CloseButton = document.createElement('button');
        CloseButton.textContent = 'X';
        CloseButton.classList.add('delete');
        return CloseButton
    }

    #toggleDone(e) {
        if (e.target.tagName === 'LI') {
            const idx = e.target.dataset.idx;
            this.todos[idx].done = !this.todos[idx].done;
            salvaTodo(this.todos);
            this.#renderTodos();
        }
    }

    #deleteTodo(e) {
        if (e.target.tagName === 'BUTTON') {
            const li = e.target.parentElement;
            const idx = li.dataset.idx;
            this.todos.splice(idx, 1);
            salvaTodo(this.todos);
            this.#renderTodos();
        }
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