import './App.css';

import React from 'react';
import Message from "./components/Message"

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      count: 10
    }
  }

  render(){

    return(
      <div className="App-header">
        <p>Je suis App, {this.state.count}</p>
        <Message />
      </div>
    )
  }
}

export default App;
