import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { backButton } from '../util/navigation-helper';
import OTPContainer from '../components/OTP/OTPContainer';

class OTP extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      key: 'otp',
      title: 'OTP',
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
        <OTPContainer navigation={this.props.navigation} />
      </View>
    )
  }
}

export default OTP;
