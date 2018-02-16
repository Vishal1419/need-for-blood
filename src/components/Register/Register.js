import React from 'react';
import { View, Text, Picker, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Spinner } from '../Common';
import FormInput from '../Form/FormInput';
import validate from '../../util/validation-rules';

const screenWidth = Dimensions.get('window').width;

const Register = (props) => {
  const { registerButtonStyle } = styles;
  return (
    <View style={{ height: '100%' }}>
      <KeyboardAwareScrollView extraHeight={screenWidth}>
        <View style={{ marginTop: 50 }}>
          <View style={{ marginBottom: 50, alignItems: 'center' }}>
          {
            props.selectedProfilePic
              ? <TouchableOpacity onPress={props.onSelectImage}>
                  <Image source={{ uri: `data:image/jpg;base64,${props.selectedProfilePic}` }} style={{ width: screenWidth / 2, height: screenWidth / 2, borderRadius: screenWidth / 4 }} />
                </TouchableOpacity>
              : <TouchableOpacity onPress={props.onSelectImage}>
                  <Image source={require('../../static/images/avatar.png')} style={{ width: screenWidth / 2, height: screenWidth / 2, borderRadius: screenWidth / 4 }} />
                </TouchableOpacity>
          }
          </View>
          <Field id="name" name="name" type="input" label="Name:" component={FormInput} />
          <Field id="address" name="address" type="geo-search" label="City, State, Country:" component={FormInput} />
          <Field id="bloodGroup" name="bloodGroup" type="select" mode="dropdown" label="Blood Group:" component={FormInput}>
            {
              props.bloodGroups && props.bloodGroups.map((bloodGroup, index) => <Picker.Item key={index} label={bloodGroup.name} value={bloodGroup.name} />)
            }
          </Field>
          <Button type="submit" title="Register" buttonStyle={registerButtonStyle} onPress={props.handleSubmit(props.onRegister)} />
        </View>
      </KeyboardAwareScrollView>
      {props.loading && <Spinner />}
    </View>
  );
}

const validateFields = (values) => {
  const errors = {};
  console.log(values.address);
  if (!validate('hasValue', values.name)) {
    errors.name = 'Name is required';
  } 

  if (!validate('hasValue', values.address)) {
    errors.address = 'Address is required';
  }

  return errors;
}

const styles = {
  registerButtonStyle: {
    backgroundColor: '#8a0707',
    // marginTop: 32
  }
}

export default reduxForm({ form: 'frmRegister', validate: validateFields, enableReinitialize: true })(Register);