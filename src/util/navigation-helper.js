import React from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';

export const resetNavigation = (targetRoute, navigation) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: targetRoute }),
    ],
  });
  navigation.dispatch(resetAction);
};

export const backButton = (navigation) => {
  return (
    <TouchableWithoutFeedback onPress={() => { navigation.goBack(); }}>
      <View>
        <Text style={{ fontSize: 16, color: '#FFFFFF', marginLeft: 16 }}>Back</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};