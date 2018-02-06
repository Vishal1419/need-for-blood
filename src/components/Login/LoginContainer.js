import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from './Login';
import RequestStates from '../../util/request-states';
import { actions as countriesActions } from '../../ducks/countries';
import { actions as loginActions } from '../../ducks/login';

let initialValues = {};

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: ''
    }
  }
  
  componentWillMount() {
    this.props.getCountries().then(() => {
      this.setState({ selectedCountry: this.props.countries[0].code });
    });
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.countries !== this.props.countries) {
      nextProps.countries && nextProps.countries.length > 0 && this.setInitialValues(nextProps.countries);
    }
  }

  setInitialValues = (countries) => {
    initialValues = {
      'country': countries[0].code
    };
  } 

  selectCountry = (country) => {
    this.setState({ selectedCountry: country });
  }

  onLogin = (values) => {
    this.props.verifyPhone(values.country, values.phone).then(() => {
      this.props.navigation.navigate('otp');
    })
  }

  render() {
    return (
      <Login countries={this.props.countries} initialValues={initialValues} 
        selectedCountry={this.state.selectedCountry} selectCountry={this.selectCountry} 
        onLogin={this.onLogin}/>
    );
  }
}

const mapStateToProps = (state, props) => ({
  countries: state.countries.countries,
  loading: (state.countries.requestState === RequestStates.init || state.countries.requestState === RequestStates.loading) ||
            state.login.requestState === RequestStates.loading
});

const mapDispatchToProps = (dispatch, props) => ({
  getCountries: () => dispatch(countriesActions.getCountries()),
  verifyPhone: (countryCode, mobileNo) => dispatch(loginActions.verifyPhone(countryCode, mobileNo))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);