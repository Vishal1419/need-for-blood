import React, { Component } from 'react';
import { connect } from 'react-redux';

import Home from './Home';
import { actions as bloodCirculationActions } from '../../ducks/blood-circulation';

class HomeContainer extends Component {
  render() {
    return (
      <Home navigation={this.props.navigation} selectBloodCirculationType={this.props.selectBloodCirculationType} />
    );
  }
}

// const mapStateToProps = (state, props) => ({

// });

const mapDispatchToProps = (dispatch, props) => ({
  selectBloodCirculationType: (circulationType) => dispatch(bloodCirculationActions.selectBloodCirculationType(circulationType))
});

export default connect(null, mapDispatchToProps)(HomeContainer);