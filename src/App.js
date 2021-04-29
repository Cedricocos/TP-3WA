import "./App.css";

import React from "react";
import Yam from "./components/Yam";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 10,
    };
  }

  render() {
    return (
      <div className="App-header">
        <Yam />
      </div>
    );
  }
}

export default App;
