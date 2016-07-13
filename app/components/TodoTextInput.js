import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Input, Modal, Button, Grid, Col, Row, Tabs, Tab, Pagination } from 'react-bootstrap';
import style from './TodoTextInput.css';
import $ from'jquery';
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
      allHref:[]
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
    console.log("findAllHref");
    var sourceCode = this.state.source;
    // console.log($(sourceCode));
    var hrefArray = [];
    var className = this.state.text ;
    console.log(className);
    var selector = 'a.' + className ;
    console.log(selector);
    $(sourceCode).find(selector).each((index,Element)=>{
      var tempHref = $(Element).attr('href') ;
      var baseUrl = "www.flipkart.com" ; 
      hrefArray[index] = baseUrl.concat(tempHref);
      // this.setState=({
      //   allhref:hrefArray
      // });
    });
    console.log(hrefArray);
    this.setState({
      allHref:hrefArray
    });
    console.log(this.state.allHref);
  }

  showHref = () => {
     chrome.runtime.onConnect.addListener((port) => {
      console.assert(port.name == "nodeExchanager");
      port.onMessage.addListener((msg) => {
        var htmlInfo = msg.htmlElement;
        this.nodeProcessor(htmlInfo);
      });
    });   
  }

  nodeProcessor = (node) =>{

    if((node[1]=='i'&&node[2]=='m')&&(node[2]=='m'&&node[3]=='g')){
      var nodeClass= $(node).attr('src');
      console.log(nodeClass);
    }

    else { 
      var nodeClass= $(node).attr('class');
      var nodeHref = $(node).attr('href');
      this.setState({
        text:nodeClass,
        href: nodeHref
      });
    }
  }

  showPreview = (href) => {
    href = this.state.href;
    alert(href);
  } 


  render() {
    let element;
    element = (
      <ul>
        {this.state.allHref.map(liEmenent => {
          return(<li className={style.li}>{liEmenent}</li>)
        })}
      </ul>  
    );
    return (
      <div >
        <Row>
          <Col lg={1}>
            <textarea
              className={classnames({
                [style.edit]: this.props.editing,
                [style.new]: this.props.newTodo
              })}
              type="text"
              placeholder={this.props.placeholder}
              autoFocus="true"
              value={this.state.text}
            />
          </Col>
          <Col lg={1}>
            <Button className={style.button} onClick={this.showHref}>Add Href</Button>
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
  }
}
