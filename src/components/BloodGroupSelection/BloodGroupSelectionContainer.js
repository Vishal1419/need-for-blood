import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Location, Permissions } from 'expo';
import { connect } from 'react-redux';

import BloodGroupSelection from './BloodGroupSelection';
import RequestStates from '../../util/request-states';
import { actions as bloodGroupActions } from '../../ducks/blood-group';
import { actions as bloodCirculationActions } from '../../ducks/blood-circulation';

class BloodGroupSelectionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBloodGroup: null
    }
  }

  componentWillMount() {
    this.props.getBloodGroups();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bloodGroups !== this.props.bloodGroups) {
      nextProps.bloodGroups && nextProps.bloodGroups.length > 0 && this.selectBloodGroup(this.props.user.blood_group);
    }
  }

  async getLocationAsync() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    } else {
      throw new Error('Location permission not granted');
    }
  }

  selectBloodGroup = (bloodGroup) => {
    this.setState({
      selectedBloodGroup: bloodGroup
    });
  }

  circulateBlood = () => {
    const countryCode = this.props.user.country_code;
    const mobileNo = this.props.user.mobile_no;
    const bloodGroup = this.state.selectedBloodGroup;
    if (this.props.circulationType === 'DONATE') {
      this.props.checkIfAlreadySeekerInSameGroup(bloodGroup, countryCode, mobileNo).then(() => {
        if (this.props.isSeekerInSameGroup) {
          Alert.alert(
            'Confirm', 
            `You are currently seeking ${bloodGroup}, if you will donate ${bloodGroup}, then you will be removed from ${bloodGroup} seekers list. Do you want to continue?`,
            [
              {text: 'No', style: 'cancel' },
              {
                text: 'Yes', 
                onPress: () => {
                  this.getLocationAsync().then((current_location) => {
                    const longitude = current_location.coords.longitude;
                    const latitude = current_location.coords.latitude;
                    this.props.donateBlood(bloodGroup, longitude, latitude, countryCode, mobileNo).then(() => {
                      this.props.navigation.navigate('bloodCirculars');
                    });
                  });
                }
              }
            ]
          );
        } else {
          this.getLocationAsync().then((current_location) => {
            const longitude = current_location.coords.longitude;
            const latitude = current_location.coords.latitude;
            this.props.donateBlood(bloodGroup, longitude, latitude, countryCode, mobileNo).then(() => {
              this.props.navigation.navigate('bloodCirculars');
            });
          });
        }
      });
    } else {
      this.props.checkIfAlreadyDonorInSameGroup(bloodGroup, countryCode, mobileNo).then(() => {
        if (this.props.isDonorInSameGroup) {
          Alert.alert(
            'Confirm',
            `You are currently donating ${bloodGroup}, if you will seek ${bloodGroup}, then you will be removed from ${bloodGroup} donors list. Do you want to continue?`,
            [
              { text: 'No' },
              {
                text: 'Yes',
                onPress: () => {
                  this.getLocationAsync().then((current_location) => {
                    const longitude = current_location.coords.longitude;
                    const latitude = current_location.coords.latitude;
                    this.props.seekBlood(bloodGroup, longitude, latitude, countryCode, mobileNo).then(() => {
                      this.props.navigation.navigate('bloodCirculars');
                    });
                  });
                }
              }
            ]
          );
        } else {
          this.getLocationAsync().then((current_location) => {
            const longitude = current_location.coords.longitude;
            const latitude = current_location.coords.latitude;
            this.props.seekBlood(bloodGroup, longitude, latitude, countryCode, mobileNo).then(() => {
              this.props.navigation.navigate('bloodCirculars');
            });
          });
        }
      });
    }
  }

  render() {
    return (
      <BloodGroupSelection bloodGroups={this.props.bloodGroups} circulationType={this.props.circulationType}
        selectedBloodGroup={this.state.selectedBloodGroup} selectBloodGroup={this.selectBloodGroup} circulateBlood={this.circulateBlood} />
    );
  }
}

const mapStateToProps = (state, props) => ({
  loading: state.bloodGroup.requestState === RequestStates.loading,
  isDonorInSameGroup: state.bloodCirculation.isDonorInSameGroup,
  isSeekerInSameGroup: state.bloodCirculation.isSeekerInSameGroup,
  bloodGroups: state.bloodGroup.bloodGroups,
  circulationType: state.bloodCirculation.circulationType,
  user: state.user.user
});

const mapDispatchToProps = (dispatch, props) => ({
  getBloodGroups: () => dispatch(bloodGroupActions.getBloodGroups()),
  checkIfAlreadyDonorInSameGroup: (bloodGroup, countryCode, mobileNo) => dispatch(bloodCirculationActions.checkIfAlreadyDonorInSameGroup(bloodGroup, countryCode, mobileNo)),
  checkIfAlreadySeekerInSameGroup: (bloodGroup, countryCode, mobileNo) => dispatch(bloodCirculationActions.checkIfAlreadySeekerInSameGroup(bloodGroup, countryCode, mobileNo)),
  donateBlood: (bloodGroup, longitude, latitude, countryCode, mobileNo) => dispatch(bloodCirculationActions.donateBlood(bloodGroup, longitude, latitude, countryCode, mobileNo)),
  seekBlood: (bloodGroup, longitude, latitude, countryCode, mobileNo) => dispatch(bloodCirculationActions.seekBlood(bloodGroup, longitude, latitude, countryCode, mobileNo))
});

export default connect(mapStateToProps, mapDispatchToProps)(BloodGroupSelectionContainer);