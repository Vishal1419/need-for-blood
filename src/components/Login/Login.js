import React from 'react';
import { View, Text, Picker, TextInput } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-native-elements';

import FormInput from '../Form/FormInput';
import validate, { digits } from '../../util/validation-rules';

const onLogin = (values) => {
  console.log(values);
}

const Login = (props) => {
  const { phoneContainerStyles, loginButtonStyle } = styles;
  return (
    <View>
      <Field id="country" name="country" type="select" mode="dropdown" label="Country:" component={FormInput}>
        {
          props.countries && props.countries.map(country => <Picker.Item key={country.code} label={country.name} value={country.code} />)
        }
      </Field>
      <Field id="phone" name="phone" type="phone" label="Phone Number:" component={FormInput} />
      <Button type="submit" title="Login" buttonStyle={loginButtonStyle} onPress={props.handleSubmit(onLogin)} />
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
    marginTop: 32
  }
}

export default reduxForm({ form: 'frmLogin', validate: validateFields })(Login);