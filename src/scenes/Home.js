import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';

import { drawerSwitch } from '../util/navigation-helper';
import HomeContainer from '../components/Home/HomeContainer';

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      key: 'home',
      title: 'Need for Blood',
      headerStyle: {
        backgroundColor: '#8a0707'
      },
      headerTintColor: '#FFFFFF',
      headerRight: drawerSwitch(navigation)
    };
  }

  render() {
    return (
      <View>
        <HomeContainer navigation={this.props.navigation} />
      </View>
    )
  }
}

export default Home;
