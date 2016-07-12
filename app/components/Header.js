import React, { PropTypes, Component } from 'react';
import TodoTextInput from './TodoTextInput';

export default class Header extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired
  };

  handleSave = text => {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  };

  render() {
    return (
      <header>
        <h1>Scrape It</h1>
        <TodoTextInput
          newTodo
          onSave={this.handleSave}
          placeholder="Node Class"
        />
      </header>
    );
  }
}
