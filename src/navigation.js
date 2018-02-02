import { StackNavigator } from 'react-navigation';
import { enhance } from 'react-navigation-addons';
import { Platform, StatusBar } from 'react-native';

import Login from './scenes/Login';
import OTP from './scenes/OTP';
import Register from './scenes/Register';
import Home from './scenes/Home';

export const MainNavigator = enhance(StackNavigator)({
  login: { screen: Login },
  otp: { screen: OTP },
  register: { screen: Register },
  home: { screen: Home },
}, {
  cardStyle: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
});