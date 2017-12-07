import React, { Component } from 'react';
import './App.css';
import Example from './components/Example/Example';
import { Button, Grid } from 'semantic-ui-react'
// const ipcRenderer = window.ipcRenderer;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  handleClick = () => {
    const response = window.ipcRenderer.sendSync('sync-message', 'ping');
    console.log(response);
    this.setState({ message: response });
  }

  render() {
    const { message } = this.state;

    return (
      <div className='App-base'>
        <Grid columns={16} centered>
          <Grid.Row>
            <Grid.Column className='blue' width={8}>
              <Example />
            </Grid.Column>
            <Grid.Column className='red' width={8}>
              <Button onClick={this.handleClick}>
              Test Button {message && message}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
