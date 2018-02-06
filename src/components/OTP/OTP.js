import React from 'react';
import { View } from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';

const OTP = (props) => {
  return (
    <View style={{ marginTop: 50 }}>
      <CodeInput keyboardType="numeric" codeLength={6} className='border-box' autoFocus codeInputStyle={{ fontWeight: '800' }}
        activeColor='#fc4482' inactiveColor='#B4B4BA'
        onFulfill={(code) => props.onVerifyOTP(code)}/>
    </View>
  );
}

export default OTP;