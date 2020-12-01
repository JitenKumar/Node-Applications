const fs = require('fs');
// const book = {
//   title: "Ego is the Enemy",
//   author: "Ryan Holdiay",
// };
// const bookJSON  =JSON.stringify(book);
// fs.writeFileSync('db.json',bookJSON);

const dataBuffer = fs.readFileSync('db.json');
console.log(dataBuffer.toString())
const data  = JSON.parse(dataBuffer);
console.log(data);