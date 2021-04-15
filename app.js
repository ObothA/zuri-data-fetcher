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
  }
};

const createDirectory = (directory) => {
  try {
    fs.mkdirSync(directory);
    console.log('[*] result directory created.');
    console.log();
  } catch (error) {
    console.log(error);
  }
};

const deleteDirectory = (directory) => {
  try {
    fs.rmdirSync(directory, { recursive: true });
    console.log('[*] result directory deleted to refresh data.');
    console.log();
  } catch (error) {
    console.log(error);
  }
};

const resultExists = checkIfDirectoryExists('result')

if (resultExists) {
  console.log('[*] result directory exists.');
  console.log();
  deleteDirectory('result');

  console.log('[+] Recreating directory... ');
  console.log();
  createDirectory('result');
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
    } else {
      console.log('Writing data to file...');
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
  })
  
  req.end()
};

fetchData('jsonplaceholder.typicode.com', '/posts');

