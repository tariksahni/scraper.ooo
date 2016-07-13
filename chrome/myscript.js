function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    return html;
}

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

	chrome.runtime.sendMessage({
	    action: "getSource",
	    source: DOMtoString(document)
	});
}


var init = function(){
	document.addEventListener("click",handler,true);
}

init();