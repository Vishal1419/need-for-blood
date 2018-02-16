import 'expo';
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { connectToSocketIO, disconnectFromSocketIO } from './src/config/sockets';
import AppRoot from './src/AppRoot';
import store from './src/ducks/store';

// let socket;

class App extends Component {
  componentWillMount() {
    connectToSocketIO();
  }
  
  componentWillUnmount() {
    disconnectFromSocketIO();
  }

  render() {
    return (
      <Provider store={store}>
        <AppRoot />
      </Provider>
    );
  }
}

export default App;