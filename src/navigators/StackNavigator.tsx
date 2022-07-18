import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack';

import { Routes } from '../enums/enums';
import { RouteParams } from "../types/types";

import List from '../screens/List';
import Details from '../screens/Details';

const Stack = createNativeStackNavigator<RouteParams>();

const StackNavigator: React.FC<NativeStackScreenProps<RouteParams>> = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.List}>
      <Stack.Screen
        name={Routes.List}
        component={List}
        options={{
          headerTitle: "Breaking Bad",
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name={Routes.Details}
        component={Details}
        options={({ route }) => ({ title: route.params.character.name })}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator