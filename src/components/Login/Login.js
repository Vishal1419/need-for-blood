import React from 'react';
import { View, Text, Picker } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-native-elements';

import { Spinner } from '../Common';
import FormInput from '../Form/FormInput';
import validate, { digits } from '../../util/validation-rules';

const Login = (props) => {
  const { phoneContainerStyles, loginButtonStyle } = styles;
  return (
    <View style={{ height: '100%'}}>
      <View style={{ marginTop: 50 }}>
        <Field id="country" name="country" type="select" mode="dropdown" label="Country:" 
          component={FormInput} selectItem={props.selectCountry}>
          {
            props.countries && props.countries.map(country => <Picker.Item key={country.code} label={country.name} value={country.code} />)
          }
        </Field>
        <Field id="phone" name="phone" type="phone" label="Phone Number:" component={FormInput} ccDisabled ccValue={props.selectedCountry} />
        <Button type="submit" title="Login" buttonStyle={loginButtonStyle} onPress={props.handleSubmit(props.onLogin)} />      
      </View>
      {props.loading && <Spinner />}
    </View>
  );
}

const validateFields = (values) => {
  const errors = {};

  if (!validate('hasValue', values.phone)) {
    errors.phone = 'Phone number is required';
  } else if (!validate('doesMatch', values.phone, digits)) {
    errors.phone = 'Phone number should be a number';
  } else if (!validate('isEqual', values.phone.length, 10)) {
    errors.phone = 'Invalid Phone number';
  }

  return errors;
}

const styles = {
  loginButtonStyle: {
    backgroundColor: '#fc4482',
    // marginTop: 32
  }
}

export default reduxForm({ form: 'frmLogin', validate: validateFields, enableReinitialize: true })(Login);