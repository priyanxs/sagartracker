import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useBusTracking } from '../context/BusTrackingContext';
import { Bus as BusIcon, ChevronDown, Bell } from 'lucide-react-native';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showRouteSelector?: boolean;
}

import { Image } from 'react-native';

export const Header: React.FC<HeaderProps> = ({
  title = 'SagarTracker',
  subtitle = 'SISTec Transit • Sagar Group',
  showRouteSelector = false,
}) => {
  const { routes, selectedRouteId, selectRoute } = useBusTracking();

  return (
    <View className="bg-slate-900 pt-12 pb-3 px-4 border-b border-slate-800 shadow-lg z-30">
      {/* Top Branding Row */}
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <View className="w-11 h-11 rounded-2xl bg-white p-0.5 items-center justify-center mr-3 shadow-md border-2 border-amber-400">
            <Image
              source={require('../../assets/logo.png')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text className="text-white text-lg font-black tracking-tight">{title}</Text>
            <Text className="text-slate-400 text-xs font-semibold">{subtitle}</Text>
          </View>
        </View>

        {/* Live GPS Badge */}
        <View className="flex-row items-center bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-full">
          <View className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
          <Text className="text-slate-200 text-[11px] font-black uppercase tracking-wider">
            FLEET LIVE
          </Text>
        </View>
      </View>

      {/* Horizontal Route Selector Chips (when requested on Live Tracking) */}
      {showRouteSelector && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row mt-2 pt-1"
          contentContainerStyle={{ paddingRight: 12 }}
        >
          {routes.map((route) => {
            const isSelected = route.id === selectedRouteId;
            return (
              <TouchableOpacity
                key={route.id}
                activeOpacity={0.8}
                onPress={() => selectRoute(route.id)}
                className={`mr-2.5 px-3 py-1.5 rounded-xl border flex-row items-center ${
                  isSelected
                    ? 'bg-blue-600 border-blue-400 shadow-md'
                    : 'bg-slate-800 border-slate-700'
                }`}
              >
                <View
                  style={{ backgroundColor: isSelected ? '#FFFFFF' : route.color }}
                  className="w-2 h-2 rounded-full mr-2"
                />
                <Text
                  className={`text-xs font-black ${
                    isSelected ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {route.routeNumber}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};
