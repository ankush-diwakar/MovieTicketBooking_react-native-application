
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//for navigaiton
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator'
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import SeatBookingScreen from './src/screens/SeatBookingScreen';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Tab" component={TabNavigator} options={{animation:'default'}} />
        <Stack.Screen name="MovieDetails" component={MovieDetailScreen} options={{animation:'slide_from_bottom'}}/>
        <Stack.Screen name="SeatBooking" component={SeatBookingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {

  }
});

export default App;
