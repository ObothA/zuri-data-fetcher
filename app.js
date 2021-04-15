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
  }
};

const createDirectory = (directory) => {
  fs.mkdirSync(directory);
};

const resultExists = checkIfDirectoryExists('result')

if (resultExists) {
  console.log('[*] result exists.');
  console.log();
} else {
  console.log('[*] result does not exist.');
  console.log();

}

