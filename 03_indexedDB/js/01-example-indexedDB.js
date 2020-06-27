/*
  # O que e indexedDB
  - banco de dados nao relacional
  - permite armazenamento de objetos no browser do usuário
  - nos permite armazenar objetos javascript, arquivos, blobs
  - suporta transacoes
  - la podemos definir multiplos indices para realizar consultas

  ## Bibliotecas que facilitam o uso de indexedDB
  - IndexedDB Promised
  - localForage

  // - https://www.youtube.com/watch?v=vb7fkBeblcw
*/
let outDB;

// function to create database
const createDB = () => {
  if(window.indexedDB) {
    const request = window.indexedDB.open('myWeatherDB',1);

    request.onsuccess = (event) => {
      console.log('on Success', event);
    }

    request.onerror = (event) => {
      console.log('on Error', event);
    }

    request.onupgradeneeded = (event) => {
      console.log('on Upgraded', event);
    }

  } else {
    console.log('no support !')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  outDB = document.getElementById('output-db');
  createDB();
});
