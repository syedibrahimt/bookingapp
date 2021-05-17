/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import WelcomeScreen from './src/containers/WelcomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BookingScreen from './src/containers/BookingScreen';
const Stack = createStackNavigator();

const fadeAnime = ({current}: {current: any}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="welcome" // for development purpose.. will change once development over
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: fadeAnime,
        }}>
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen name="book" component={BookingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
