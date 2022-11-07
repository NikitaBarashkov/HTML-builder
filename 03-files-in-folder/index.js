const fs = require('fs');
const path = require('path');

let ourDir = path.join('03-files-in-folder','secret-folder');

fs.readdir(ourDir, (err, files)=>{
  if(err) throw err;
  else {
    files.forEach(file =>{
      const pathFile = path.join('03-files-in-folder', 'secret-folder', file);

      fs.stat(pathFile, (err, stats)=>{
        if(err) throw err;
        else {
          if(stats.isFile()) {
            const extension = path.extname(file);
            const name = `File name: ${path.basename(file, extension)}`; 
            const size = `size: ${stats.size / 1000} KB`;

            console.log(`${name}, extension: ${extension}, ${size}`);
          }
        }
      })
    })
  }
})
