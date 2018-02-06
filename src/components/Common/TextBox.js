import React, { Component } from 'react';
import { TextInput, Platform } from 'react-native';

class TextBox extends Component {
  static defaultProps = {
    style: {},
    placeholder: '',
    keyboardType: 'default',
    autoCapitalize: 'sentences',
    autoCorrect: false,
    secureTextEntry: false,
    disabled: false
  }

  render() {
    const { style, placeholder, keyboardType, autoCapitalize, autoCorrect, secureTextEntry, disabled, value, onChangeText } = this.props;
    const textInputStyle = Platform.OS === 'android' ? styles.androidInputStyle : styles.iosInputStyle;
    return (
      <TextInput style={[textInputStyle, style]} placeholder={placeholder} editable={!disabled}
        keyboardType={keyboardType} autoCapitalize={autoCapitalize} autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry} value={value}
        onChangeText={onChangeText} />
    );
  }
}

const styles = {
  iosInputStyle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    marginTop: 8,
    marginLeft: 16,
    marginRight: 16,
    paddingLeft: 8,
    height: 30
  },
  androidInputStyle: {
    color: '#FFFFFF',
    marginTop: 16,
    height: 30,
    paddingLeft: 16,
    paddingBottom: 16,
    fontSize: 16
  }
};

export { TextBox };