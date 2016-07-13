import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';
import style from './App.css';
import $ from 'jquery';
@connect(
  state => ({
    todos: state.todos
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
export default class App extends Component {
  constructor() {
    super();
  }

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  // componentDidMount() {
  //    chrome.runtime.onConnect.addListener((port) => {
  //     console.assert(port.name == "nodeExchanager");
  //     port.onMessage.addListener((msg) => {
  //       var htmlInfo = msg.htmlElement;
  //       this.nodeProcessor(htmlInfo);
  //     });
  //   });
  // }

  // nodeProcessor = (node) =>{

  //   if((node[1]=='i'&&node[2]=='m')&&(node[2]=='m'&&node[3]=='g')){
  //     var nodeClass= $(node).attr('src');
  //     console.log(nodeClass);
  //   }

  //   else { 
  //     var nodeClass= $(node).attr('href');
  //     console.log(nodeClass);
  //     // console.log($(node).text().trim());
  //   }

  // } 
  // <MainSection todos={todos} actions={actions} />
  render() {
    const { todos, actions } = this.props;
    return (
      <div className={style.normal}>
        <Header addTodo={actions.addTodo} />  
      </div>
    );
  }
}
