import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { backButton } from '../util/navigation-helper';
import BloodCircularContainer from '../components/BloodCircular/BloodCircularContainer';

class BloodCircular extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate, state } = navigation;
    console.log(state.params);
    return {
      key: 'bloodCircular',
      title: state.params && state.params.circulationType === 'DONATE' ? 'Blood Seeker' : 'Blood Donor',
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
      console.log('circulationType changed');
      this.props.navigation.setParams({ circulationType: nextProps.circulacirculationTyperType });
    }
  }
  

  render() {
    return (
      <View>
        <BloodCircularContainer navigation={this.props.navigation} />
      </View>
    )
  }
}

const mapStateToProps = (state, props) => ({
  circulationType: state.bloodCirculation.circulationType
})

export default connect(mapStateToProps)(BloodCircular);
