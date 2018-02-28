import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div style={{padding: '16px 24px'}}>
        {this.props.children}
      </div>
    );
  }
}

export default App;
