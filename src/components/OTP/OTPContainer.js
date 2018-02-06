import React, { Component } from 'react';
import { connect } from 'react-redux';

import OTP from './OTP';
import RequestStates from '../../util/request-states';
import { actions as loginActions } from '../../ducks/login';

class OTPContainer extends Component {

  onVerifyOTP = (otp) => {
    this.props.verifyOTP(this.props.countryCode, this.props.mobileNo, otp).then(() => {
      this.props.otpVerified && this.props.user.name
        ? this.props.navigation.navigate('home')
        : this.props.navigation.navigate('register')
    }).catch((err) => {
      console.error(err);
    });
  }

  render() {
    return (
      <OTP onVerifyOTP={this.onVerifyOTP} />
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