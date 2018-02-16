import React, { Component } from 'react';
import { connect } from 'react-redux';

import BloodCircularsList from './BloodCircularsList';
import { actions as bloodCirculationActions } from '../../ducks/blood-circulation';

class BloodCircularsListContainer extends Component {

  selectBloodCircular = (bloodCircular) => {
    console.log(bloodCircular);
    this.props.selectBloodCircular(bloodCircular);
    this.props.navigation.navigate('bloodCircular');
  }

  render() {
    console.log(this.props.donors);
    return (
      <BloodCircularsList navigation={this.props.navigation} circulationType={this.props.circulationType}
        bloodCirculars={this.props.circulationType === 'DONATE' ? this.props.seekers : this.props.donors}
        selectBloodCircular={this.selectBloodCircular} />
    );
  }
}

const mapStateToProps = (state, props) => ({
  circulationType: state.bloodCirculation.circulationType,
  seekers: state.bloodCirculation.seekersInRange,
  donors: state.bloodCirculation.donorsInRange
});

const mapDispatchToProps = (dispatch, props) => ({
  selectBloodCircular: (bloodCircular) => dispatch(bloodCirculationActions.selectBloodCircular(bloodCircular))
});

export default connect(mapStateToProps, mapDispatchToProps)(BloodCircularsListContainer);