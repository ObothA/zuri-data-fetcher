const fs = require('fs');

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

