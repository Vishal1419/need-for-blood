import React from 'react';
import { View, Text, Picker } from 'react-native';
import { Button } from 'react-native-elements';

const BloodGroupSelection = (props) => {
  const { containerStyle, labelStyle, pickerStyle, buttonStyle } = styles;
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>Blood Group</Text>
      <Picker id="bloodGroup" name="bloodGroup" type="select" mode="dropdown" style={pickerStyle} 
        selectedValue={props.selectedBloodGroup} onValueChange={(value) => { console.log(value); props.selectBloodGroup(value)}}>
        {
          props.bloodGroups && props.bloodGroups.map((bloodGroup, index) => <Picker.Item key={index} label={bloodGroup.name} value={bloodGroup.name} />)
        }
      </Picker>  
      <Button type="submit" title={props.circulationType === 'DONATE' ? 'Donate Blood' : 'Get Blood' } buttonStyle={buttonStyle} onPress={props.circulateBlood} />
    </View>
  );
}

const styles = {
  containerStyle: {
    marginTop: 50
  },
  labelStyle: {
    fontWeight: 'bold',
    marginLeft: 16
  },
  pickerStyle: {
    margin: 16
  },
  buttonStyle: {
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: '#8a0707'
  }
}

export default BloodGroupSelection;