import React from 'react';
import { View, Text, Image } from 'react-native';
import { MapView } from 'expo';

const BloodCircular = (props) => {
  const { containerStyle, personalInfoContainerStyle, imageStyle, personalInfoWrapperStyle, personalInfoStyle, nameStyle, phoneStyle,
          mapStyle, mapMarkerStyle, bloodGroupsContainerStyle, bloodGroupStyle} = styles;
  return (
    <View style={containerStyle}>
      <View style={personalInfoContainerStyle}>
        {
          props.selectedBloodCircular.user.profile_pic
            ? <Image source={{ uri: `data:image/jpg;base64,${props.selectedBloodCircular.user.profile_pic}` }} style={imageStyle} />
            : <Image source={require('../../static/images/avatar.png')} style={imageStyle} />
        }
        <View style={personalInfoWrapperStyle}>
          <View style={personalInfoStyle}>
            <Text style={nameStyle}>{props.selectedBloodCircular.user.name}</Text>
            <Text style={phoneStyle}>{`${props.selectedBloodCircular.user.country_code}${props.selectedBloodCircular.user.mobile_no}`}</Text>
          </View>
        </View>
      </View>
      <View style={bloodGroupsContainerStyle}>
        {
          props.selectedBloodCircular.bloodGroups.map((bloodGroup, index) =>
            <Text key={bloodGroup.name} style={bloodGroupStyle}>{bloodGroup.name}</Text>
          )
        }
      </View>
      <MapView style={mapStyle} showsUserLocation showsMyLocationButton
        initialRegion={{
          latitude: props.selectedBloodCircular.geometry.coordinates[1],
          longitude: props.selectedBloodCircular.geometry.coordinates[0],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <MapView.Marker style={mapMarkerStyle} centerOffset={{ x: 0, y: -35 }}
          title={props.selectedBloodCircular.user.name}
          coordinate={{ longitude: props.selectedBloodCircular.geometry.coordinates[0], 
                        latitude: props.selectedBloodCircular.geometry.coordinates[1]}}>
          <Image style={mapMarkerStyle} source={require('../../static/images/map-marker.png')} />
        </MapView.Marker>
      </MapView>
    </View>
  );
}

const styles ={
  containerStyle: {
    height: '100%'
  },
  personalInfoContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    marginRight: 0
  },
  imageStyle: {
    height: 100, 
    width: 100,
    borderRadius: 50,
    zIndex: 111,
    borderWidth: 5,
    borderColor: '#e9e9ee'
  },
  personalInfoWrapperStyle: {
    flex: 1,
    height: 100,
    backgroundColor: '#8a0707',
    marginLeft: -50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  personalInfoStyle: {
    flexDirection: 'column',
    marginLeft: 32,
    backgroundColor: '#8a0707',
  },
  nameStyle: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 20
  },
  phoneStyle: {
    fontSize: 20,
    color: '#ffffff'
  },
  mapStyle: {
    flex: 1
  },
  mapMarkerStyle: {
    height: 70, 
    width: 43.84 
  },
  bloodGroupsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bloodGroupStyle: {
    borderWidth: 1,
    borderColor: '#8a0707',
    borderRadius: 4,
    margin: 8,
    padding: 4,
    fontSize: 20,
    fontWeight: 'bold'
  }
}

export default BloodCircular;