import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

const Spinner = ({ size, text }) => {
  const { wrapperStyle, containerStyle, activityIndicatorStyle, textStyle } = styles;
  return (
    <View style={wrapperStyle}>
      <View style={containerStyle}>
        <ActivityIndicator size={size || 'large'} style={activityIndicatorStyle} color="#eeeeee" />
        <Text style={textStyle}>{text}</Text>
      </View>
    </View>
  );
};

const styles = {
  wrapperStyle: {
    position: 'absolute',
    zIndex: 9999,
    top: -140,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: 'rgba(64,64,64,0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444',
    height: 75,
    width: 165,
    borderRadius: 5
  },
  activityIndicatorStyle: {

  },
  textStyle: {
    backgroundColor: 'transparent'
  }
};

export { Spinner };