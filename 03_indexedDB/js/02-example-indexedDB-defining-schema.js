/*
    O que e indexedDB
  - banco de dados nao relacional
  - permite armazenamento de objetos no browser do usuário
  - nos permite armazenar objetos javascript, arquivos, blobs
  - suporta transacoes
  - la podemos definir multiplos indices para realizar consultas

  Bibliotecas que facilitam o uso de indexedDB
  - IndexedDB Promised
  - localForage

  // - https://www.youtube.com/watch?v=vb7fkBeblcw
*/

let outDB;
let db;

// function to create database
const createDB = () => {
  if(window.indexedDB) {
    const request = window.indexedDB.open('myWeatherDB', 3);

    request.onerror = (event) => {
      console.log('Error request', event);
      outDB.innerHTML = 'Error request';
    }

    request.onsuccess = (event) => {
      db = request.result;
      console.log('Successed request', event, db);
      outDB.innerHTML = 'Successed request';
    }

    request.onupgradeneeded = (event) => {

      db = event.target.result;

      // objectStorage - "tabela"
      const objectStoreLocation = db.createObjectStore('location',
        {
          keyPath: 'id',
          autoIncrement: true
        });

      objectStoreLocation.createIndex('lat', 'lat', { unique: false });
      objectStoreLocation.createIndex('log', 'log', { unique: false });

      console.log('Upgraded request', event)
      outDB.innerHTML = 'Upgraded request';
    }

  } else {
    console.log('You don\'t have support');
    outDB.innerHTML = 'Upgraded request';
  }
}

// execute script when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {

  outDB = document.getElementById('output-db');
  createDB();
});
