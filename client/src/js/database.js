import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // create connection to database and what version to use
  const jateDb = await openDB('jate', 1);
  //create new transaction and specify the database and privileges to use
  const tx = jateDb.transaction('jate', 'readwrite');
  //open the object store
  const store = tx.objectStore('jate');
  //update content to the database
  const request = store.put({ id: 1, value: content });
  // confirm the request
  const result = await request;
  console.log('Data saved to the databse', result)

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // create connection to database and what version to use
  const jateDb = await openDB('jate', 1);
  // create a new transaction, specify the database and privileges
  const tx = jateDb.transaction('jate', 'readonly');
  // open desired object store
  const store = tx.objectStore('jate');
  // use getAll() method to get all the data in the database,
  const request = store.getAll();
  // confirm the request.
  const result = await request;
  console.log('Data read from database', result);
  return result.value;
};

initdb();
