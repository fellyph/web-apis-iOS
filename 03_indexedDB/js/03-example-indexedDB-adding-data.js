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

  ### Banco de dados

  ### Object Store
  - Possui o comportamento similar ao comportamento de tabelas.
  - O armazena objetos organizados por tipos, não são os tipos padrões javaScript mas tipos que definimos durante a construcão de nosso banco

  ### Index
  - O indice é um tipo criado para organizar nossa Object Store, por uma propriedade individual
  - Um timpo de informação que podemos armazenar para consulta.

  ### Transactions
  - Um transação é um pacote que um grupo de operações para manter a integridade do banco de dados
  - Se uma operação dentro de uma transação falhar, toda a transação será cancelada
  - Todas operações de leitura e escrita precisam fazer parte de uma transação

  ### Cursor
  - Um mecanismo interar sobre os registros do banco de dados.

  // - https://www.youtube.com/watch?v=vb7fkBeblcw
*/

let outDB;
let db;

// function to create database
const createDB = () => {
  if(window.indexedDB) {
    const request = window.indexedDB.open("MyWeatherDB",1);

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
      console.log('Upgraded request', event)
      outDB.innerHTML = 'Upgraded request';

      //saving the database
      let db = event.target.result;

      //
      let objectStore = db.createObjectStore('forecast',
        {
          keyPath: 'id',
          autoIncrement: true
        });

      // creating a index it can repeat if we pass the value unique as false
      objectStore.createIndex('lat', 'lat', {unique: false});

      // creating a second index the objectStore can have more than one
      objectStore.createIndex('log', 'log', {unique: false});

      console.log('Config completed');
    }

  } else {
    console.log('You don\'t have support');
    outDB.innerHTML = 'Upgraded request';
  }
}

// execute script when the DOM is loaded
document.addEventListener('DOMContentLoaded', (event) => {
  outDB = document.getElementById('output-db');
  createDB();
});
