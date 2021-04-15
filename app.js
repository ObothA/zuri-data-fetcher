const fs = require('fs');
const http = require('http')

/** Welcome Note */
console.log('##################################');
console.log(' Welcome to the Zuri data fetcher.')
console.log('##################################');
console.log();


const checkIfDirectoryExists = (directory) => {
  try {
    return fs.existsSync(directory);
  } catch (error){
    console.log(error);
    console.log();
  }
};

const createDirectory = (directory) => {
  try {
    fs.mkdirSync(directory);
    console.log('[*] result directory created.');
    console.log();
  } catch (error) {
    console.log(error);
    console.log();
  }
};

const resultExists = checkIfDirectoryExists('result')

if (resultExists) {
  console.log('[*] result directory exists.');
  console.log();
} else {
  console.log('[*] result directory does not exist.');
  console.log();
  createDirectory('result');
}

const writeDataToFile = (file, content) => {
  fs.writeFile(file, content, { flag: 'a+' }, err => {
    if (err) {
      console.error(err)
    }
  })
};

const fetchData = (hostname, path) => {
  const options = {
    hostname,
    port: 80,
    path,
    method: 'GET'
  }

  console.log('[*] Fetching data... ');
  console.log();
  const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
  
    res.on('data', d => {
      writeDataToFile('./result/posts.json', d);
    });
  });
  
  req.on('error', error => {
    console.error(error)
    console.log();
  })
  
  req.end()
};

fetchData('jsonplaceholder.typicode.com', '/posts');

