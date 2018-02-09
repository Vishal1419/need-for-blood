import React, { Component } from 'react';
import { Alert } from 'react-native';
import { ImagePicker } from 'expo';
import { connect } from 'react-redux';

import Register from './Register';
import RequestStates from '../../util/request-states';
import { actions as bloodGroupActions } from '../../ducks/blood-group';
import { actions as registerActions } from '../../ducks/register';
import { resetNavigation } from '../../util/navigation-helper';

const initialValues = {};

class RegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProfilePic: ''
    }
  }

  componentWillMount() {
    this.props.getBloodGroups();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bloodGroups !== this.props.bloodGroups) {
      nextProps.bloodGroups && nextProps.bloodGroups.length > 0 && this.setInitialValues(nextProps.bloodGroups);
    }
  }

  setInitialValues = (bloodGroups) => {
    initialValues = {
      'bloodGroup': bloodGroups[0].name
    };
  }

  selectProfilePic = (url) => {
    this.setState({ selectedProfilePic: url });
  }
  
  onSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ selectedProfilePic: result.base64 });
    }
  };

  onRegister = (values) => {
    this.props.registerUser(this.state.selectedProfilePic, values.name, values.address, values.bloodGroup, this.props.countryCode, this.props.mobileNo)
      .then(() => {
        resetNavigation('home', this.props.navigation)
      }).catch((err) => {
        console.log(err);
        Alert.alert('Error', 'There was an unexpected error. Please contact your system administrator.', [{ text: 'OK' }])
      })
  }

  render() {
    return (
      <Register bloodGroups={this.props.bloodGroups} initialValues={initialValues} loading={this.props.loading} 
        selectedProfilePic={this.state.selectedProfilePic} selectProfilePic={this.selectProfilePic} 
        onSelectImage={this.onSelectImage} onRegister={this.onRegister} />
    );
  }
}

const mapStateToProps = (state, props) => ({
  countryCode: state.login.countryCode,
  mobileNo: state.login.mobileNo,
  user: state.user.user,
  bloodGroups: state.bloodGroup.bloodGroups,
  loading: (state.bloodGroup.requestState === RequestStates.init || state.bloodGroup.requestState === RequestStates.loading) || 
            state.user.requestState === RequestStates.loading
});

const mapDispatchToProps = (dispatch, props) => ({
  getBloodGroups: () => dispatch(bloodGroupActions.getBloodGroups()),
  registerUser: (profilePicture, name, address, bloodGroup, countryCode, mobileNo) => dispatch(registerActions.registerUser(profilePicture, name, address, bloodGroup, countryCode, mobileNo))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);