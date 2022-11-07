const fs = require('fs');
const path = require('path');

fs.mkdir(path.join('04-copy-directory', 'files-copy'), {recursive: true}, (err)=>{
  if(err) throw err;
  else {
    fs.readdir(path.join('04-copy-directory', 'files-copy'), (err, filesCopy)=>{
      filesCopy.forEach(copy => {
        fs.unlink(path.join('04-copy-directory', 'files-copy', copy), err =>{
         
        })
      })
    })
    fs.readdir(path.join('04-copy-directory', 'files'), (err, files)=>{
      if(err) throw err;
      else {
        files.forEach(file => {
          fs.copyFile(path.join('04-copy-directory', 'files', file), 
            path.join('04-copy-directory', 'files-copy', file),
            (err)=>{ 
              if(err) throw err;
            })
        })    
      }
    })
  }
})
