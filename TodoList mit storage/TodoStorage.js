// TodoStorage.js

const STORAGE_KEY = 'todos';

export function salvaTodo(lista) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

export function leggiTodo() {
    const dati = localStorage.getItem(STORAGE_KEY);
    return dati ? JSON.parse(dati) : [];
}
