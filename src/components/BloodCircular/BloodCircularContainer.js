import React, { Component } from 'react';
import { connect } from 'react-redux';

import BloodCircular from './BloodCircular';

class BloodCircularContainer extends Component {
  render() {
    return (
      <BloodCircular selectedBloodCircular={this.props.selectedBloodCircular} />
    )
  }
}

const mapStateToProps = (state, props) => ({
  selectedBloodCircular: state.bloodCirculation.selectedBloodCircular
});

// const mapDispatchToProps = (dispatch, props) => ({

// });

export default connect(mapStateToProps)(BloodCircularContainer);
