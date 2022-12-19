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

export const putDb = async (content) => {
  console.log('Updating the DB')

  const jateDB = await openDB('jate', 1);

  const tx = jateDB.transaction('jate', 'readwrite');
  
  const store = tx.objectStore('jate');

  const request = store.put({ id: 1, text: content });

  const result = await request;
  console.log('Content saved to the DB', result);
};

export const getDb = async () => {
  console.log('Loading from the DB')

  const jateDB = await openDB('jate', 1);

  const tx = jateDB.transaction('jate', 'readonly');
  
  const store = tx.objectStore('jate');

  const request = store.getAll(1);

  const result = await request;
  if (result) {
    console.log('Content loaded from the DB', result);
    return result;
  } else {
    console.log('Content not found');
  }

};

initdb();
