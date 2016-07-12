
function handler(e){
	e.stopPropagation();
    e.preventDefault();
    var evt=window.event || evt; // window.event for IE 
    if (!evt.target) evt.target=evt.srcElement; // extend target property for IE 
  	var a = evt.target;
  	var htmlElement = a.outerHTML ;
  	console.log(htmlElement);
   	// chrome.runtime.sendMessage({'method':'setInfo', key:htmlElement});
   	var port = chrome.runtime.connect({name: "nodeExchanager"});
	port.postMessage({htmlElement: htmlElement});
}


var init = function(){
	document.addEventListener("click",handler,true);
}

init();