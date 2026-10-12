import React from 'react';
import { View, Text, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LiveTrackingScreen } from '../screens/LiveTrackingScreen';
import { RoutesDirectoryScreen } from '../screens/RoutesDirectoryScreen';
import { AlertsScreen } from '../screens/AlertsScreen';
import { RootTabParamList } from '../types';
import { Navigation, Compass, MapPin, Route, Bell } from 'lucide-react-native';

const Tab = createBottomTabNavigator<RootTabParamList>();

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="LiveTracking"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E2E8F0',
          borderTopWidth: 2,
          height: Platform.OS === 'ios' ? 88 : 70,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 8,
          elevation: 16,
          shadowColor: '#0F172A',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 10,
        },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#64748B',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '800',
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="LiveTracking"
        component={LiveTrackingScreen}
        options={{
          tabBarLabel: 'Live Track',
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`items-center justify-center ${
                focused ? 'bg-blue-50 px-3 py-1 rounded-full' : ''
              }`}
            >
              <Navigation
                size={22}
                color={color}
                strokeWidth={focused ? 2.8 : 2}
                fill={focused ? '#2563EB' : 'none'}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="RoutesDirectory"
        component={RoutesDirectoryScreen}
        options={{
          tabBarLabel: 'All Routes',
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`items-center justify-center ${
                focused ? 'bg-blue-50 px-3 py-1 rounded-full' : ''
              }`}
            >
              <Route
                size={22}
                color={color}
                strokeWidth={focused ? 2.8 : 2}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Alerts"
        component={AlertsScreen}
        options={{
          tabBarLabel: 'Alerts',
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`items-center justify-center ${
                focused ? 'bg-blue-50 px-3 py-1 rounded-full' : ''
              }`}
            >
              <Bell
                size={22}
                color={color}
                strokeWidth={focused ? 2.8 : 2}
                fill={focused ? '#2563EB' : 'none'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
