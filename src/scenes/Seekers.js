import React, { Component } from 'react';
import { View } from 'react-native';

import { backButton } from '../util/navigation-helper';
import BloodCircularsContainer from '../components/BloodCirculars/BloodCircularsContainer';

class Seekers extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Blood Seekers',
      headerStyle: {
        backgroundColor: '#8a0707'
      },
      headerTintColor: '#FFFFFF',
      headerLeft: backButton(navigation)      
    };
  }

  render() {
    return (
      <View>
        <BloodCircularsContainer navigation={this.props.navigation} />
      </View>
    )
  }
}

export default Seekers;
