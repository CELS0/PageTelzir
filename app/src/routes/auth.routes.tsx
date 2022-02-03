import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home/Home';
import { Signin } from '../screens/Signin/Signin';
import { useAuth } from '../hooks/auth';

export type RootStackParamList = {
  Signin: undefined;
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export function AuthRoutes() {
  const { user } = useAuth();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      {user?.name
        ?
        <RootStack.Screen
          name="Home"
          component={Home}
        />
        :
        <RootStack.Screen
          name="Signin"
          component={Signin}
        />
      }

    </RootStack.Navigator>
  )
}