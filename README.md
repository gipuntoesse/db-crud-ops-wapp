# db-crud-ops-wapp
web app for database crud operations 

La web app si compone di una componente front-end, ovvero una pagina web per l'utilizzo delle api implementate, e di una componente di back-end, nella quale sono implementate le 4 api. Il progetto consiste nella realizzazione delle operazioni di inserimento/lettura/modifica/cancellazione di un utente su database
La componente di back end è un progetto nodejs (è stata utilizzata la versione di Node 8.11.1) ed è posta in esecuzione attraverso il comando:<br>
<i>node --harmony_async_iteration backend.js</i>
Il database impiegato è l'istanza di un servizio cloud-based che permette l'uso di database MongoDB.
Le 4 funzionalità implementate sono le seguenti:
- memorizzazione di un nuovo utente su db, la cui api è disponibile attraverso una richiesta http <b>POST</b> al seguente url:
  <i>localhost:3333/</i>
- recupero di un utente dal db, la cui api è disponibile attraverso attraverso una richiesta http <b>GET</b> al seguente url:
 <i>localhost:3333/{user}/</i>
- aggiornamento informazioni relative utente dal db, la cui api è disponibile attraverso attraverso una richiesta http <b>PUT</b> al seguente url:
 <i>localhost:3333/{user}/</i>
- cancellazione utente dal db, la cui api è disponibile attraverso attraverso una richiesta http <b>DELETE</b> al seguente url:
 <i>localhost:3333/{user}/
 
dove {user} è lo username scelto per l'utente

Nel progetto è presente anche la documentazione dei servizi esposti generata in base alla notazione OPENAPI, disponibile al seguente url:
<i>localhost:3333/api-docs/</i>
