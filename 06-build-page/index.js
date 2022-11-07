const fs = require('fs');
const path = require('path');

fs.mkdir(path.join('06-build-page', 'project-dist'), {recursive: true}, (err)=>{
  if(err) throw err;
  fs.copyFile(path.join('06-build-page', 'template.html'), 
    path.join('06-build-page', 'project-dist', 'index.html'), (err)=>{
      if(err) throw err;
      fs.readFile(path.join('06-build-page', 'project-dist', 'index.html'), (err, indexFile)=>{
        if(err) throw err;
        fs.readdir(path.join('06-build-page', 'components'), (err, comps)=>{
          if(err) throw err;
          comps.forEach(comp =>{ 
            fs.readFile(path.join('06-build-page', 'components', comp), 'utf-8', (err, elem)=>{
              if(err) throw err;
              let elemName = `{{${path.basename(comp, path.extname(comp))}}}`;
              indexFile = indexFile.toString().replace(elemName, elem);
              fs.writeFile(path.join('06-build-page', 'project-dist', 'index.html'), indexFile, (err) => {
                if(err) throw err;
              });
            })
          })
        })
      })
  })
})

const arrStyles = [];

fs.access(path.join('06-build-page', 'project-dist', 'style.css'), fs.constants.F_OK, (err)=>{
    if(err) return;     
    else {
      fs.truncate(path.join('06-build-page', 'project-dist', 'style.css'), (err)=>{
        if(err) throw err;
      })
    } 
})

fs.readdir(path.join('06-build-page', 'styles'), (err, files)=>{
  if(err) throw err;
  else {
    files.forEach(file => {
      fs.stat(path.join('06-build-page', 'styles', file), (err, stats)=>{
        if(err) throw err;
        else {
          if(stats.isFile() && path.extname(file) == '.css'){
            const restream = fs.createReadStream(path.join('06-build-page', 'styles', file));
            restream.on('data', data=>{
              arrStyles.push(data.toString());
              if(arrStyles.length > 0){
                fs.appendFile(path.join('06-build-page', 'project-dist', 'style.css'), arrStyles[arrStyles.length - 1], (err)=>{
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

fs.readdir(path.join('06-build-page', 'assets'), (err, files)=>{
  if(err) throw err;
  files.forEach(file =>{
    fs.stat(path.join('06-build-page', 'assets', file), (err, stats)=>{
      if(err) throw err;
      else if(stats.isFile()){
        fs.copyFile(path.join('06-build-page', 'assets', file), 
            path.join('06-build-page', 'project-dist','assets', file), (err)=>{
              if(err) throw err;
    })
      } else {
        fs.readdir(path.join('06-build-page', 'assets', file), (err, insideFile)=>{
          if(err) throw err;
          else {
            fs.mkdir(path.join('06-build-page', 'project-dist', 'assets'), {recursive: true}, err=>{
              if(err) throw err;
            })
              insideFile.forEach(elem => {
                fs.mkdir(path.join('06-build-page', 'project-dist', 'assets', file), {recursive: true}, err=>{
                  if(err) throw err;
                
                  fs.copyFile(path.join('06-build-page', 'assets', file, elem),
                    path.join('06-build-page', 'project-dist', 'assets', file, elem), (err)=>{
                      if(err) throw err;
                  })  
                })
            })
          }
        })
      } 
    })
  })
})
