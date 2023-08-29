const path = require('path');
const isDev = require('electron-is-dev');
const Store = require('electron-store');

const store = new Store();

var dbFileName;

if (store.has('dbFileName')) {
  // console.log(store.get('dbFileName'));
  // store.get returns array, so (xxx)[]0
  dbFileName = store.get('dbFileName')[0];
  module.exports = dbFileName;
} else {
  if (isDev && process.argv.indexOf('--noDevServer') === -1) {
    dbFileName = path.join(
      path.dirname(__dirname),
      'extraResources',
      'MyVideos121.db'
    );
  } else {
    dbFileName = path.join(
      process.resourcesPath,
      'extraResources',
      'MyVideos121.db'
    );
  }
  module.exports = dbFileName;
}