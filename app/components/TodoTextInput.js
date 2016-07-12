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
      href: null
    };
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
      var nodeHref1 = $(node).attr('href');
      this.setState({
        text:nodeClass,
        href: nodeHref
      });
      // console.log($(node).text().trim());
    }
  }

  showPreview = (href) => {
    href = this.state.href;
    alert(href);
  } 

  // handleSubmit = evt => {
  //   const text = evt.target.value.trim();
  //   if (evt.which === 13) {
  //     this.props.onSave(text);
  //     if (this.props.newTodo) {
  //       this.setState({ text: '' });
  //     }
  //   }
  // };

  // handleChange = evt => {
  //   this.setState({ text: evt.target.value });
  // };

  // handleBlur = evt => {
  //   if (!this.props.newTodo) {
  //     this.props.onSave(evt.target.value);
  //   }
  // };

  render() {
    return (
      <p>
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
        </Row>
      </p>
    );
  }
}
