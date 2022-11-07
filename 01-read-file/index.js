const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(path.join('01-read-file', 'text.txt'));

readStream.on('data', (text)=>{
  console.log(text.toString());
})

