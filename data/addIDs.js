const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

function addIDs() {
  readFileAsync('db.json')
    .then((data) => JSON.parse(data))
    .then((db) => {
      db.events.forEach((event, index) => event.id = index + 1);
      return db;
    })
    .then((db) => writeFileAsync('db2.json', JSON.stringify(db)))
    .then(() => console.log('Finished adding ids.'))
    .catch((error) => console.error(error));
}

addIDs();
