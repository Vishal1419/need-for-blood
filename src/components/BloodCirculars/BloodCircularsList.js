import React from 'react';
import { View, Image, Text, ScrollView, TouchableHighlight } from 'react-native';

const BloodCircularsList = (props) => {
  const { scrollViewStyle, containerStyle, coverStyle, bloodCircularStyle, imageStyle, textContainerStyle, nameStyle,
    bloodGroupContainerStyle, bloodGroupStyle, moreBloodGroupsStyle } = styles;
  return (
    <ScrollView style={scrollViewStyle}>
      {
        props.bloodCirculars && props.bloodCirculars.length > 0
          ? props.bloodCirculars.map(bloodCircular => {
            let moreBloodGroups = false;
            return (
              <TouchableHighlight key={bloodCircular._id} onPress={() => props.selectBloodCircular(bloodCircular)}>
                <View style={coverStyle}>
                  <View style={bloodCircularStyle}>
                    {
                      bloodCircular.user.profile_pic
                        ? <Image source={{ uri: `data:image/jpg;base64,${bloodCircular.user.profile_pic}` }} style={imageStyle} />
                        : <Image source={require('../../static/images/avatar.png')} style={imageStyle} />
                    }
                    <View style={textContainerStyle}>
                      <Text style={nameStyle}>{bloodCircular.user.name}</Text>
                      <Text>{bloodCircular.user.mobile_no}</Text>
                    </View>
                  </View>
                  <View style={bloodGroupContainerStyle}>
                    {
                      bloodCircular.bloodGroups.map((bloodGroup, index) =>
                        index < 2
                          ? <Text key={bloodGroup.name} style={bloodGroupStyle}>{bloodGroup.name}</Text>
                          : moreBloodGroups = true
                      )
                    }
                    {
                      moreBloodGroups && <Text style={moreBloodGroupsStyle}>...</Text>
                    }
                  </View>
                </View>
              </TouchableHighlight>
            );
          })
          : props.circulationType === 'DONATE'
            ? <Text>Sorry, currently we do not have any seekers who matches your blood group. If somebody near you needs blood then we will inform you.</Text>
            : <Text>Sorry, currently we do not have any donors who matches your blood group. If somebody near you likes to donate the blood then we will inform you.</Text>
      }
    </ScrollView>
  );
}

const styles = {
  scrollViewStyle: {
    height: '100%'
  },
  coverStyle: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bloodCircularStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 70,
    marginTop: 0.4,
    marginBottom: 0.4
  },
  imageStyle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginLeft: 10
  },
  textContainerStyle: {
    marginLeft: 10
  },
  bloodGroupContainerStyle: {
    marginRight: 10,
    flexDirection: 'row'
  },
  nameStyle: {
    fontWeight: 'bold'
  },
  bloodGroupStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#8a0707',
    margin: 4,
    padding: 4
  },
  moreBloodGroupsStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 4,
    padding: 0
  }
}

export default BloodCircularsList;