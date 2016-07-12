import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';
import './todoapp.css';
import $ from 'jquery';
var htmlInfo ;

chrome.storage.local.get('state', obj => {
  const { state } = obj;
  const initialState = JSON.parse(state || '{}');
  const createStore = require('../../app/store/configureStore');
  ReactDOM.render(
    <Root store={createStore(initialState)} />,
    document.querySelector('#root')
  );
});

// function nodeProcessor(node){
//   console.log($(node));

//   // console.log($(node).tagName());
//     var nodeClass= $(node).nodeName();
//     console.log(nodeClass);
  

//   // else { 
//   //   var nodeClass= $(node).attr('class');
//   //   console.log(nodeClass);
//   //   console.log($(node).text().trim());
//   // }

// } 

// chrome.runtime.onConnect.addListener(function(port) {
//   console.assert(port.name == "nodeExchanager");
//   port.onMessage.addListener(function(msg) {
//     htmlInfo = msg.htmlElement;
//     nodeProcessor(htmlInfo);
//   });
// });

