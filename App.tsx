import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { BusTrackingProvider } from './src/context/BusTrackingContext';
import { BottomTabNavigator } from './src/navigation/BottomTabNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <BusTrackingProvider>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor="#0F172A" />
          <BottomTabNavigator />
        </NavigationContainer>
      </BusTrackingProvider>
    </SafeAreaProvider>
  );
}
