import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';

import OTP from './OTP';
import RequestStates from '../../util/request-states';
import { actions as loginActions } from '../../ducks/login';
import { resetNavigation } from '../../util/navigation-helper';

class OTPContainer extends Component {

  onVerifyOTP = (otp) => {
    this.props.verifyOTP(this.props.countryCode, this.props.mobileNo, otp).then(() => {
      if (this.props.otpVerified) {
        this.props.user.name
          ? resetNavigation('home', this.props.navigation)
          : resetNavigation('register', this.props.navigation);
      } else {
        Alert.alert('Invalid OTP', 'Please enter a valid OTP.', [{ text: 'OK' }]);
      }
    }).catch((err) => {
      console.error(err);
      Alert.alert('Error', 'There was an unexpected error. Please contact your system administrator.', [{ text: 'OK' }]);
    });
  }

  render() {
    return (
      <OTP loading={this.props.loading} onVerifyOTP={this.onVerifyOTP} />
    );
  }
}

const mapStateToProps = (state, props) => ({
  countryCode: state.login.countryCode,
  mobileNo: state.login.mobileNo,
  otpVerified: state.login.otpVerified,
  user: state.user.user,
  loading: state.login.requestState === RequestStates.loading
});

const mapDispatchToProps = (dispatch, props) => ({
  verifyOTP: (countryCode, mobileNo, otp) => dispatch(loginActions.verifyOTP(countryCode, mobileNo, otp))
});

export default connect(mapStateToProps, mapDispatchToProps)(OTPContainer);