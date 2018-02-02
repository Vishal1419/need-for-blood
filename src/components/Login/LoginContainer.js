import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from './Login';
import RequestStates from '../../util/request-states';
import { actions } from '../../ducks/countries';

class LoginContainer extends Component {
  componentWillMount() {
    this.props.getCountries();
  }
  
  render() {
    return (
      <Login countries={this.props.countries} />
    );
  }
}

const mapStateToProps = (state, props) => ({
  countries: state.countries.countries,
  loading: (state.countries.requestState === RequestStates.init || state.countries.requestState === RequestStates.loading)
});

const mapDispatchToProps = (dispatch, props) => ({
  getCountries: () => dispatch(actions.getCountries())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);