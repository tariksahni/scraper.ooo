const bluebird = require('bluebird');
global.Promise = bluebird;
console.log('background triggered');
function promisifier(method) {
  // return a function
  return function promisified(...args) {
    // which returns a promise
    return new Promise(resolve => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}

function promisifyAll(obj, list) {
  list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}

// let chrome extension api support Promise
promisifyAll(chrome, [
  'tabs',
  'windows',
  'browserAction',
  'contextMenus'
]);
promisifyAll(chrome.storage, [
  'local',
]);

require('./background/contextMenus');
require('./background/inject');
require('./background/badge');

var htmlInfo;

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    if(message.method == 'setInfo')
    { 
      htmlInfo = message.htmlElement;
    }
    else if(message.method == 'getInfo')
    {
      sendResponse(htmlInfo);
    }
  }
);