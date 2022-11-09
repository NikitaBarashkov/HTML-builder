const fs = require('fs');
const path = require('path');

const arrStyles = [];

fs.access(path.join('05-merge-styles', 'project-dist', 'bundle.css'), (err)=>{
  if(err) return;
  else {
    fs.truncate(path.join('05-merge-styles', 'project-dist', 'bundle.css'), (err)=>{
      if(err) throw err;
    })
  }
})

fs.readdir(path.join('05-merge-styles', 'styles'), (err, files)=>{
  if(err) throw err;
  else {
    files.forEach(file => {
      fs.stat(path.join('05-merge-styles', 'styles', file), (err, stats)=>{
        if(err) throw err;
        else {
          if(stats.isFile() && path.extname(file) == '.css'){
            const restream = fs.createReadStream(path.join('05-merge-styles', 'styles', file));

            restream.on('data', data=>{
              arrStyles.push(data.toString());

              if(arrStyles.length > 0){
                fs.appendFile(path.join('05-merge-styles', 'project-dist', 'bundle.css'), arrStyles[arrStyles.length - 1], (err)=>{
                  if(err) throw err;
                })
              }
            })
          }
        }
      })
    })
  }
})

