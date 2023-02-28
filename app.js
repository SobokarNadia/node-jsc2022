const fs = require('fs');

// fs.mkdir('./folder', (err)=> console.log(err));
// for (let i = 0; i < 5; i++) {
//     fs.mkdir(`./folder/folder${i}`, err => console.log(err));
//     fs.writeFile(`./folder/file${i}.txt`, ' ', err => console.log(err));
// }

// fs.mkdir('./girls', err => console.log(err))
// fs.mkdir('./boys', err => console.log(err))

// fs.writeFile(`./girls/anna.json`, '{"name": "anna", "gender":"female"}', err => console.log(err));
// fs.writeFile(`./girls/max.json`, '{"name": "max", "gender":"male"}', err => console.log(err));
// fs.writeFile(`./girls/masha.json`, '{"name": "anna", "gender":"female"}', err => console.log(err));
// fs.writeFile(`./girls/sasha.json`, '{"name": "sasha", "gender":"male"}', err => console.log(err));
// fs.writeFile(`./boys/dany.json`, '{"name": "dany", "gender":"male"}', err => console.log(err));
// fs.writeFile(`./boys/vika.json`, '{"name": "vika", "gender":"female"}', err => console.log(err));
// fs.writeFile(`./boys/boy.json`, '{"name": "boy", "gender":"male"}', err => console.log(err));
// fs.writeFile(`./boys/girl.json`, '{"name": "girl", "gender":"female"}', err => console.log(err));

fs.readdir('./boys', (err,data)=> {
    
})
