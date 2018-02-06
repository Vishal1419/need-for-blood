import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import LoginContainer from '../components/Login/LoginContainer';

class Login extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Login',
      headerStyle: {
        backgroundColor: '#fc4482'
      },
      headerTintColor: '#FFFFFF'
    };
  }

  render() {
    return (
      <View>
        <LoginContainer navigation={this.props.navigation} />
      </View>
    )
  }
}

export default Login;
