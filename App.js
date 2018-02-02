import 'expo';
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import AppRoot from './src/AppRoot';
import store from './src/ducks/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRoot />
      </Provider>
    );
  }
}

export default App;