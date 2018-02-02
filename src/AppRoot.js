import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';

import { MainNavigator } from './navigation';

class AppRoot extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center', // if this property is set then nothing will showup on the screen
    justifyContent: 'center',
  },
});

export default AppRoot;