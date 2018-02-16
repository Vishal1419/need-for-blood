import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { MapView } from 'expo';

const windowWidth = Dimensions.get('window').width;

const BloodCircularsMap = (props) => {
  const { containerStyle, mapViewStyle, mapViewCircleStyle, mapViewMarkerStyle, mapViewMarkerImageStyle, mapViewCalloutStyle,
    personalInfoContainerStyle, imageStyle, personalInfoWrapperStyle, personalInfoStyle, nameStyle, phoneStyle,
    bloodGroupsContainerStyle, bloodGroupStyle } = styles;
  return(
    <View style={containerStyle}>
      {
        props.location.latitude &&
        <MapView showsUserLocation showsMyLocationButton style={mapViewStyle} 
          initialRegion={{
            latitude: props.location.latitude,
            longitude: props.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <MapView.Circle center={props.location} radius={5000} fillColor="rgba(24, 159, 15, 0.2)" strokeColor="rgba(24, 159, 15, 0.5)" />
          {
            props.bloodCirculars.map(bloodCircular => {
              return (
                <MapView.Marker key={bloodCircular._id} style={mapViewMarkerStyle} centerOffset={{ x: 0, y: -35 }}
                  title={bloodCircular.user.name}
                  coordinate={{
                    longitude: bloodCircular.geometry.coordinates[0],
                    latitude: bloodCircular.geometry.coordinates[1]
                  }}>
                  <Image style={mapViewMarkerImageStyle} source={require('../../static/images/map-marker.png')} />
                  <MapView.Callout style={mapViewCalloutStyle}>
                    <View>
                      <View style={personalInfoContainerStyle}>
                        {
                          bloodCircular.user.profile_pic
                            ? <Image source={{ uri: `data:image/jpg;base64,${bloodCircular.user.profile_pic}` }} style={imageStyle} />
                            : <Image source={require('../../static/images/avatar.png')} style={imageStyle} />
                        }
                        <View style={personalInfoWrapperStyle}>
                          <View style={personalInfoStyle}>
                            <Text style={nameStyle}>{bloodCircular.user.name}</Text>
                            <Text style={phoneStyle}>{`${bloodCircular.user.country_code}${bloodCircular.user.mobile_no}`}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={bloodGroupsContainerStyle}>
                        {
                          bloodCircular.bloodGroups.map((bloodGroup, index) =>
                            <Text key={bloodGroup.name} style={bloodGroupStyle}>{bloodGroup.name}</Text>
                          )
                        }
                      </View>
                    </View>
                  </MapView.Callout>
                </MapView.Marker>
              )
            })
          }
        </MapView>
      }
    </View>
  );
}

const styles = {
  containerStyle: {
    height: '100%' 
  },
  mapViewStyle: {
    flex: 1
  },
  mapViewCircleStyle: {

  },
  mapViewMarkerStyle: {
    height: 70, 
    width: 43.84
  },
  mapViewMarkerImageStyle: {
    height: 70, 
    width: 43.84
  },
  mapViewCalloutStyle: {
    width: windowWidth * (80 / 100)
  },
  personalInfoContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    marginRight: 0,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  personalInfoWrapperStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  personalInfoStyle: {
    flexDirection: 'column',
    marginLeft: 16
  },
  nameStyle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  phoneStyle: {
    fontSize: 20
  },
  bloodGroupsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bloodGroupStyle: {
    borderWidth: 1,
    borderColor: '#8a0707',
    borderRadius: 4,
    margin: 4,
    padding: 2,
    fontSize: 16
  }
}

export default BloodCircularsMap;