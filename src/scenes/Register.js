import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import RegisterContainer from '../components/Register/RegisterContainer';

class Register extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      key: 'register',
      title: 'Register',
      headerStyle: {
        backgroundColor: '#8a0707'
      },
      headerTintColor: '#FFFFFF'
    };
  }

  render() {
    return (
      <View>
        <RegisterContainer navigation={this.props.navigation} />
      </View>
    )
  }
}

export default Register;
