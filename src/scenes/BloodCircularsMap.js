import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';

import { backButton } from '../util/navigation-helper';
import BloodCircularsMapContainer from '../components/BloodCirculars/BloodCircularsMapContainer';

class BloodCircularsMap extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate, state } = navigation;
    return {
      key: 'bloodCirculars',
      title: 'Map',
      tabBarIcon: ({ tintColor }) => <Image source={require('../static/images/location.png')} style={{ margin: 8, height: 32, width: 32, tintColor: tintColor }} />,
      headerTitle: state.params && state.params.circulationType === 'DONATE' ? 'Blood Seekers' : 'Blood Donors',
      headerStyle: {
        backgroundColor: '#8a0707'
      },
      headerTintColor: '#FFFFFF',
      headerLeft: backButton(navigation)
    };
  }

  componentWillMount() {
    this.props.navigation.setParams({ circulationType: this.props.circulationType });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.circulationType !== this.props.circulationType) {
      this.props.navigation.setParams({ circulationType: nextProps.circulacirculationTyperType });
    }
  }

  render() {
    return (
      <View>
        <BloodCircularsMapContainer navigation={this.props.navigation} />
      </View>
    )
  }
}

const mapStateToProps = (state, props) => ({
  circulationType: state.bloodCirculation.circulationType
})

export default connect(mapStateToProps)(BloodCircularsMap);
