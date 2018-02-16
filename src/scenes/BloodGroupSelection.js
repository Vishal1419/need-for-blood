import React, { Component } from 'react';
import { View } from 'react-native';

import { backButton } from '../util/navigation-helper';
import BloodGroupSelectionContainer from '../components/BloodGroupSelection/BloodGroupSelectionContainer';

class BloodGroupSelection extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      key: 'bloodGroupSelection',
      title: 'Blood Group',
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
        <BloodGroupSelectionContainer navigation={this.props.navigation} />
      </View>
    )
  }
}

export default BloodGroupSelection;
