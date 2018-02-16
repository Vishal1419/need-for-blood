import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import LoginContainer from '../components/Login/LoginContainer';
// import LoginContainer from '../components/Register/ImagePickerExample';

class Login extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      key: 'login',
      title: 'Login',
      headerStyle: {
        backgroundColor: '#8a0707'
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
