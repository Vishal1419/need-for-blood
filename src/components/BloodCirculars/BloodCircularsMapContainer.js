import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Location, Permissions } from 'expo';

import BloodCircularsMap from './BloodCircularsMap';
import { actions as bloodCirculationActions } from '../../ducks/blood-circulation';

class BloodCircularsMapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: {}
    }
  }
  
  componentWillMount() {
    this.getLocationAsync().then((current_location) => {
      this.setState({
        location: { latitude: current_location.coords.latitude, longitude: current_location.coords.longitude }
      })
    })
  }
  

  async getLocationAsync() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    } else {
      throw new Error('Location permission not granted');
    }
  }

  render() {
    return (
      <BloodCircularsMap navigation={this.props.navigation} circulationType={this.props.circulationType}
        bloodCirculars={this.props.circulationType === 'DONATE' ? this.props.seekers : this.props.donors}
        location={this.state.location} />
    );
  }
}

const mapStateToProps = (state, props) => ({
  circulationType: state.bloodCirculation.circulationType,
  seekers: state.bloodCirculation.allSeekers,
  donors: state.bloodCirculation.allDonors
});

export default connect(mapStateToProps)(BloodCircularsMapContainer);