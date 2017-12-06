import React from 'react';
import './Example.css';

class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <div className="constrainer">
          <div className='Example'>
            <p>An Example component!</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Example;
