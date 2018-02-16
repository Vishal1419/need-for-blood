import React, { Component } from 'react';
import { View } from 'react-native';

import { backButton } from '../util/navigation-helper';
import BloodCircularsContainer from '../components/BloodCirculars/BloodCircularsContainer';

class Donors extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Blood Donors',
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

export default Donors;
