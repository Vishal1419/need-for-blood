import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import RegisterContainer from '../components/Register/RegisterContainer';

class Register extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Register',
      headerStyle: {
        backgroundColor: '#fc4482'
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
