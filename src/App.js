import './App.css';

import React from 'react';
import Header from "./components/Header"

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      count: 10
    }
  }

  render(){

    return(
      <div>
        <Header />
      </div>
    )
  }
}

export default App;
