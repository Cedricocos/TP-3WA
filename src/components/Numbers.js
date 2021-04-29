import React from 'react';
class Numbers extends React.Component{
    render(){
      const { numbers } = this.props;
      return (
          <ul>
                  {numbers.map((user, i) => <li key={i}>{user}</li>)}
          </ul>
      )
    }
}

export default Numbers;