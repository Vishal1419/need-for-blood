import React from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Home = (props) => {
  const { textStyle } = styles;
  return (
    <View style={{ height: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => {
        props.selectBloodCirculationType('DONATE');
        props.navigation.navigate('bloodGroupSelection');
      }}>
        <View>
          <Image source={require('../../static/images/donate-blood.png')} style={{ width: screenWidth / 2, height: screenWidth / 2, borderRadius: screenWidth / 4 }} />
          <Text style={textStyle}>Donate</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { 
        props.selectBloodCirculationType('SEEK');
        props.navigation.navigate('bloodGroupSelection');
      }}>
        <View>
          <Image source={require('../../static/images/get-blood.png')} style={{ width: screenWidth / 2, height: screenWidth / 2, borderRadius: screenWidth / 4 }} />
          <Text style={textStyle}>Get Blood</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles={
  textStyle: {
    fontSize: 14,
    alignSelf: 'center'
  }
};

export default Home;