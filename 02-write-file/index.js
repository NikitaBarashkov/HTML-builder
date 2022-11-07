const fs = require('fs');
const path = require('path');
const readLine = require('readline')
const { stdin: input, stdout: output, stdin } = require('process');

const rl = readLine.createInterface({ input, output });

console.log('Do you wanna write something? ');

rl.on('line', (line) => {
  if(line !== 'exit'){
    fs.appendFile(path.join('02-write-file', 'text.txt'), `${line}\n`, ()=>{
    })
  } else {
    console.log('See you later');
    rl.close();
  }
});

rl.on('SIGINT', ()=> {
  console.log('See you later');
  process.exit();
})
