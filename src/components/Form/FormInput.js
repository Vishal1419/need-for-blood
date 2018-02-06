import React from 'react';
import {View, Text, Picker, TextInput} from 'react-native';
import { TextBox } from '../Common';

const FormInput = (props) => {
  const { touched, error } = props.meta || {};
  const { labelStyles } = styles;
  return (
    <View>
      <Text style={[labelStyles, { display: props.label ? 'flex' : 'none', color: `${(touched && error) ? 'red' : 'black'}` }]}>{props.label}</Text>
      <View style={{ padding: props.inputWrapperPadding }}>
        {returnInput(props)}
      </View>
    </View>
  );
};

const returnInput = (props) => {
  const { touched, error } = props.meta || {};  
  const { pickerStyles, phoneContainerStyles, phoneCCStyle, textBoxWrapper, textBoxStyle, errorStyles } = styles;
  switch (props.type) {
    case 'select':
      return (
        <Picker {...props.input} id={props.id} placeholder={props.placeholder} style={pickerStyles} mode="dialog"
          selectedValue={props.input.value} onValueChange={value => {props.input.onChange(value); props.selectItem(value);}}>
          {props.children}
        </Picker>
      );
    case 'phone':
      return (
        <View style={phoneContainerStyles}>
          <TextBox {...props.input} id={`cc-${props.id}`} value={props.ccValue} style={phoneCCStyle} disabled={props.ccDisabled} />
          <View style={textBoxWrapper}>
            <TextBox {...props.input} id={props.id} placeholder={props.placeholder} disabled={props.disabled}
              style={[textBoxStyle, { borderColor: `${(touched && error) ? 'red' : '#B4B4BA'}` }]} keyboardType="phone-pad"
              value={props.input.value} onChangeText={value => props.input.onChange(value)} />
            <View>
              <Text style={errorStyles}>{touched ? (error ? error : '') : ''}</Text>
            </View>
          </View>
        </View>
      );
    default:
      return (
        <View>
          <TextBox {...props.input} id={props.id} placeholder={props.placeholder} disabled={props.disabled}
            style={[textBoxStyle, { borderColor: `${(touched && error) ? 'red' : '#B4B4BA'}` }]}
            value={props.input.value} onChangeText={value => props.input.onChange(value)} />
          <View>
            <Text style={errorStyles}>{touched ? (error ? error : '') : ''}</Text>
          </View>
        </View>
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
    marginBottom: 4,    
    borderWidth: 1
  },
  phoneContainerStyles: {
    flexDirection: 'row'
  },
  phoneCCStyle: {
    flex: 1.5,
    marginRight: 0,
    paddingLeft: 0,
    textAlign: 'center',
    backgroundColor: '#EBEAF1',
    fontWeight: 'bold'
  },
  textBoxWrapper: {
    flex: 8
  }
}

export default FormInput;
