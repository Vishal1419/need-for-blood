import React from 'react';
import { TouchableWithoutFeedback, View, Text, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';

export const resetNavigation = (targetRoute, navigation) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    key: null,
    actions: [
      NavigationActions.navigate({ routeName: targetRoute }),
    ],
  });
  navigation.dispatch(resetAction);
};

export const backButton = (navigation) => {
  return (
    <TouchableWithoutFeedback onPress={() => { navigation.dispatch(NavigationActions.back()); }}>
      <View>
        <Image source={require('../static/images/chevron-left.png')} style={{ height: 32, width: 32 }} />
        {/* <Text style={{ fontSize: 16, color: '#FFFFFF', marginLeft: 16 }}>Back</Text> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

export const drawerSwitch = (navigation) => {
  return (
    <TouchableWithoutFeedback onPress={() => { navigation.navigate('DrawerOpen') }}>
      <View>
        <Image source={require('../static/images/list-white.png')} style={{ marginRight:16, height: 32, width: 32 }} />
      </View>
    </TouchableWithoutFeedback>
  );
};