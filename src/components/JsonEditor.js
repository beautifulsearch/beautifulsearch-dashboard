import React, { Component } from 'react';
import JSONEditorReact from './JSONEditorReact';

const modes = ['text'];

class App extends Component {
  state = {
    text: null,
    mode: 'text'
  };

  render() {
    return (
      <div className="app">
        <div className="contents">
          <JSONEditorReact
              text={this.state.text}
              mode={modes}
              modes={modes}
              indentation={4}
              onChangeText={this.onChangeText}
              onModeChange={this.onModeChange}
              onChange={this.props.updateParent(this.state.text)}
          />
        </div>
      </div>
    );
  }

  onChangeText = (text) => {
    this.setState({ text });
  };

  onModeChangeSelect = (event) => {
    this.setState({ mode: event.target.value });
  };

  onModeChange = (mode) => {
    this.setState({ mode });
  };
}

export default App;