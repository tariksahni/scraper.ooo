import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Input, Modal, Button, Grid, Col, Row, Tabs, Tab, Pagination } from 'react-bootstrap';
import style from './TodoTextInput.css';
import $ from'jquery';
var hrefArray = [];
var nextPageIndex = false ;
export default class TodoTextInput extends Component {

  static propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    newTodo: PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || '',
      href: "",
      source:"",
      allHref:[],
      nodeValue:null,
      nodeTag:null
    };
  }


  componentDidMount(){
    console.log("component");
    var sourceCode = "";
    chrome.runtime.onMessage.addListener((request, sender) => {
      if (request.action == "getSource") {
        sourceCode = request.source;
        this.setState({
          source:sourceCode
        });
      }
    });
  }

  findAllHref = () => {

    hrefArray =[];
    var sourceCode = this.state.source;
    var className = this.state.text ;
    var selector = this.state.nodeTag + '.' + className ;
    console.log(selector);

    $(sourceCode).find(selector).each((index,Element)=>{
      var tempHref = $(Element).attr('href').replace(/(\r\n|\n|\r)/gm,"") ;
      var baseUrl = "www.flipkart.com" ; 
      hrefArray[index] = baseUrl.concat(tempHref);
    });

    console.log(hrefArray);
    this.setState({
      allHref:hrefArray
    });

    chrome.storage.local.set({
      allHrefArray:hrefArray
    });

    chrome.storage.local.get('allHrefArray',result  =>{
      console.log("hrefs Saved");
      console.log(result.allHrefArray);
    })
  }

  showClass = () => {
     chrome.runtime.onConnect.addListener((port) => {
      console.assert(port.name == "nodeExchanager");
      port.onMessage.addListener((msg) => {
        var htmlInfo = msg.htmlElement;
        this.nodeProcessor(htmlInfo);
      });
    });   
  }

  nodeProcessor = (node) => {
    console.log(node);
    var nodeClass = $(node).attr('class');
    var nodeTag = node.split(' ')[0].split('<')[1] ;
    this.setState({
      text:nodeClass,
      nodeTag:nodeTag
    });

    if(nodeTag == 'img'){
      var nodeValue= $(node).attr('src');
      console.log(nodeValue);
      this.setState({
        nodeValue:nodeValue,
      });
    }

    if (nodeTag =='a') { 
      var nodeValue = $(node).attr('href');
      this.setState({
        nodeValue:nodeValue,
      });
    }

    if( nodeTag == 'h1' || nodeTag == 'span' || nodeTag == 'h2' || nodeTag == 'h3' || nodeTag == 'h4' || nodeTag == 'h5' || nodeTag == 'h6' || nodeTag == 'h7' || nodeTag == 'h8' || nodeTag == 'h9' ){
      var selector = nodeTag + '.' + nodeClass ;
      var nodeValue = $(this.state.source).find(selector).text();
      this.setState({
        nodeValue:nodeValue,
      });
    }  
  }

  showPreview = () => {
    var nodeValue = this.state.nodeValue;
    alert(nodeValue);
  } 

  nextPageFunction = () =>{
    console.log('yeah');
    nextPageIndex = true ;
    this.render();
  }

  saveFieldValue =() =>{

    let fieldValue = this.refs.fieldValue.value;
  }

  render() {
    let element;
    let firstPage ;
    let nextPage ;
    element = (
      <ul>
        {this.state.allHref.map(liEmenent => {
          return(<li className={style.li}>{liEmenent}</li>)
        })}
      </ul>  
    );
  
    firstPage = (
      <div>
        <Row>
          <Col lg={1}>
            <textarea
              type="text"
              placeholder={this.props.placeholder}
              autoFocus="true"
              value={this.state.text}
            />
          </Col>
          <Col lg={1}>
            <Button className={style.button} onClick={this.showClass}>Add Href</Button>
          </Col>
          <Col lg={1}>
            <Button className={style.button} onClick={this.showPreview}>Show</Button>
          </Col>
           <Col lg={1}>
            <Button className={style.button} onClick={this.findAllHref}>Show href's</Button>
          </Col>
        </Row>
        <h5 className={style.h5}> List of hrefs </h5>
        <div className={style.div1}>
          {element}
        </div> 
      </div> 
    ); 

    nextPage = (
      <div>
        <h8 className={style.h8}>NOTE : Right Click on any product and open it in a new tab for collecting single product information !!</h8>
        <h5 className={style.h5}>Product Information</h5>
        <br/>
        <h8 className={style.h8}> Click on Add Field Button and select the desired node </h8>
        <p><h4>Field : </h4><input text = "text" placeholder="Type the desired field" ref="fieldValue"/></p>
        <p><h4>Node Class : </h4>
          <textarea
            type="text"
            placeholder="Desired Node Class"
            autoFocus="true"
            value={this.state.text}
            />
        </p>
        <Button className={style.button} onClick = {this.showClass}>Add NodeClass</Button>
        <Button className={style.button} onClick = {this.showPreview}>Show NodeValue</Button>
        <Button className={style.button} onClick = {this.saveFieldValue}>Add them</Button>
      </div>  
    );


    return(
      <div>
        <div>
          <br />
            {firstPage}
        </div>
        <div>
        <br />
          {nextPage}
        </div>
      </div>
    )
  }

}
