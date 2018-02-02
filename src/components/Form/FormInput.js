import React from 'react';
import {View, Text, Picker, TextInput} from 'react-native';
import { TextBox } from '../Common';

const FormInput = (props) => {
  const { touched, error } = props.meta || {};
  const { labelStyles, errorStyles } = styles;
  return (
    <View>
      <Text style={[labelStyles, { display: props.label ? 'flex' : 'none', color: `${(touched && error) ? 'red' : 'black'}` }]}>{props.label}</Text>
      <View style={{ padding: props.inputWrapperPadding }}>
        {returnInput(props)}
        <View>
          <Text style={errorStyles}>{touched ? (error ? error : '') : ''}</Text>
        </View>
      </View>
    </View>
  );
};

const returnInput = (props) => {
  const { touched, error } = props.meta || {};  
  switch (props.type) {
    case 'select':
      return (
        <Picker {...props.input} id={props.id} placeholder={props.placeholder} style={styles.pickerStyles} mode="dialog"
          selectedValue={props.input.value} onValueChange={value => props.input.onChange(value)}>
          {props.children}
        </Picker>
      );
    case 'phone':
      return (
        <View style={styles.phoneContainerStyles}>
          <TextBox {...props.input} id={`sel-${props.id}`} value={props.sel} style={styles.phoneSelStyle} />
          <TextBox {...props.input} id={props.id} placeholder={props.placeholder} disabled={props.disabled}
            style={[ styles.textBoxStyle, { borderColor: `${(touched && error) ? 'red' : 'black'}` }]}
            value={props.input.value} onChangeText={value => props.input.onChange(value)} />
        </View>
      );
    default:
      return (
        <TextBox {...props.input} id={props.id} placeholder={props.placeholder} disabled={props.disabled}
          style={[styles.textBoxStyle, { borderColor: `${(touched && error) ? 'red' : 'black'}` }]}
          value={props.input.value} onChangeText={value => props.input.onChange(value)} />
      );
  }
};

const styles = {
  labelStyles: {
    paddingLeft: 16, 
    fontWeight: 'bold'
  },
  errorStyles: {
    color: 'red',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8
  },
  pickerStyles: {
    marginLeft: 16, 
    marginRight: 16
  },
  textBoxStyle: {
    flex: 8,
    marginBottom: 4,
    borderWidth: 1,
  },
  phoneContainerStyles: {
    flex: 1,
    flexDirection: 'row'
  },
  phoneSelStyle: {
    flex: 1.5,
    marginRight: 0
  }
}

export default FormInput;
