import React from 'react';
// import {NavigationProp, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Navigators} from '../enums/enums';
import {NavigatorParams} from '../types/types';

import StackNavigator from './StackNavigator';

const RootNavigator = createNativeStackNavigator<NavigatorParams>();

const AppNavigator: React.FC<any> = () => {
  return (
    <RootNavigator.Navigator initialRouteName={Navigators.StackNavigator}>
      <RootNavigator.Screen
        name={Navigators.StackNavigator}
        component={StackNavigator}
        options={{
          headerShown: false,
        }}
      />
    </RootNavigator.Navigator>
  );
};

export default AppNavigator;
