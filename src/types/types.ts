import { NavigatorScreenParams } from '@react-navigation/native';
import { Navigators, Routes } from '../enums/enums';
import { Character } from '../interfaces/interfaces';

export type NavigatorParams = {
  [Navigators.StackNavigator]: NavigatorScreenParams<RouteParams>;
  [key: string]: any;
};

export type RouteParams = {
  [Routes.List]: undefined;
  [Routes.Details]: { character: Character };
};