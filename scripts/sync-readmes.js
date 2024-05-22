const fs = require('fs');
const { argv } = require('process');

const packageName = argv.length >= 2 ? argv[2] : '';

if (!packageName) {
  throw 'Название пакета не передано в sync-readmes';
}

const README_PATH = 'README.md';

copyExtraFiles();

function copyExtraFiles() {
  if (!fs.existsSync(README_PATH)) {
    throw new Error('README.md does not exist');
  } else {
    copyReadmeIntoLibFolder(README_PATH, packageName);
  }
}

function copyReadmeIntoLibFolder(srcPath, lib) {
  try {
    const fileBody = fs.readFileSync(srcPath).toString();

    fs.writeFileSync(`dist/libs/${lib}/${README_PATH}`, fileBody);
  } catch (_) {}
}
