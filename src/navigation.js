import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { enhance } from 'react-navigation-addons';
import { Platform, StatusBar } from 'react-native';

import Login from './scenes/Login';
import OTP from './scenes/OTP';
import Register from './scenes/Register';
import Home from './scenes/Home';
import BloodGroupSelection from './scenes/BloodGroupSelection';
import BloodCircularsList from './scenes/BloodCircularsList';
import BloodCircularsMap from './scenes/BloodCircularsMap';
import BloodCircular from './scenes/BloodCircular';

export const MainNavigator = new StackNavigator({
  login: { screen: Login },
  otp: { screen: OTP },
  register: { screen: Register },
  home: {
    screen: DrawerNavigator({
      needForBlood: { screen: Home },
      bloodGroupSelection: { screen: BloodGroupSelection },
      bloodCirculars: {
        screen: TabNavigator({
          bloodCircularsList: { screen: BloodCircularsList },
          bloodCircularsMap: { screen: BloodCircularsMap }
        }, {
          tabBarOptions: {
            activeTintColor: '#8a0707'
          },
        })
      },
      bloodCircular: { screen: BloodCircular }
    }, {
      initialRouteName: 'needForBlood',
      drawerPosition: 'right'
    })
  },
}, {
  cardStyle: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
});

// login: { screen: Login },
// otp: { screen: OTP },
// register: { screen: Register },
// home: { screen: Home },
// bloodGroupSelection: { screen: BloodGroupSelection },
// bloodCirculars: {
//   screen: TabNavigator({
//     bloodCircularsList: { screen: BloodCircularsList },
//     bloodCircularsMap: { screen: BloodCircularsMap }
//   }, {
//       tabBarOptions: {
//         activeTintColor: '#8a0707'
//       },
//     })
// },
// bloodCircular: { screen: BloodCircular }