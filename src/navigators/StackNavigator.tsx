import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {Routes} from '../enums/enums';
import {RouteParams} from '../types/types';
import Home from '../screens/Home';
import CharacterDetails from '../screens/CharacterDetails';

const Stack = createNativeStackNavigator<RouteParams>();

const StackNavigator: React.FC<NativeStackScreenProps<RouteParams>> = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.List}>
      <Stack.Screen
        name={Routes.List}
        component={Home}
        options={{
          headerTitle: 'Indozone',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name={Routes.Details} component={CharacterDetails} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
