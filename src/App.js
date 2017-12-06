import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Example from './components/Example/Example';
import { Button, Grid } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <div className='App-base'>
        <Grid columns={16} centered>
          <Grid.Row>
            <Grid.Column className='blue' width={8}>
              <Example />
            </Grid.Column>
            <Grid.Column className='red' width={8}>
              <Button>
                Test Button
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
