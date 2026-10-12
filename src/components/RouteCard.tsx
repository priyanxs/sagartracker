import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { BusRoute } from '../types';
import { StatusBadge } from './StatusBadge';
import { StopsTimeline } from './StopsTimeline';
import {
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  Navigation,
  Bus as BusIcon,
  Users,
  Eye,
} from 'lucide-react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface RouteCardProps {
  route: BusRoute;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onTrackOnMap: () => void;
  onOpenCrewInfo: () => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({
  route,
  isExpanded,
  onToggleExpand,
  onTrackOnMap,
  onOpenCrewInfo,
}) => {
  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onToggleExpand();
  };

  return (
    <View className="bg-white rounded-3xl mb-4 border-2 border-slate-200 overflow-hidden shadow-sm">
      {/* Primary Card Header */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggle}
        className="p-5 pb-4"
      >
        {/* Route Badge & Live Status */}
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center">
            <View
              style={{ backgroundColor: route.color }}
              className="px-3 py-1 rounded-xl mr-2.5 shadow-sm"
            >
              <Text className="text-white text-xs font-black tracking-wider uppercase">
                {route.routeNumber}
              </Text>
            </View>
            <Text className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              {route.shift}
            </Text>
          </View>

          <StatusBadge status={route.activeBus.status} size="sm" />
        </View>

        {/* Route Title */}
        <Text className="text-slate-950 text-xl font-extrabold tracking-tight">
          {route.title}
        </Text>

        {/* Origin to Destination */}
        <View className="flex-row items-center mt-2">
          <MapPin size={14} color="#64748B" />
          <Text className="text-slate-600 text-xs font-semibold ml-1.5 flex-1" numberOfLines={1}>
            {route.origin} → {route.destination}
          </Text>
        </View>

        {/* Highlights Row: Stops, Distance, Plate */}
        <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-slate-100">
          <View className="flex-row items-center space-x-3">
            <View className="flex-row items-center">
              <Clock size={13} color="#475569" />
              <Text className="text-slate-700 text-xs font-bold ml-1">
                {route.departureTime}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Navigation size={13} color="#475569" />
              <Text className="text-slate-700 text-xs font-bold ml-1">
                {route.stops.length} stops ({route.totalDistanceKm} km)
              </Text>
            </View>
          </View>

          {/* Expand chevron button */}
          <View className="flex-row items-center bg-slate-100 px-2.5 py-1 rounded-full">
            <Text className="text-slate-700 text-xs font-bold mr-1">
              {isExpanded ? 'Hide stops' : 'View stops'}
            </Text>
            {isExpanded ? (
              <ChevronUp size={14} color="#334155" />
            ) : (
              <ChevronDown size={14} color="#334155" />
            )}
          </View>
        </View>
      </TouchableOpacity>

      {/* Expanded Section: Stops Timeline and Action Controls */}
      {isExpanded && (
        <View className="px-5 pb-5 pt-2 bg-slate-50 border-t border-slate-200">
          {/* Active Bus Quick Status Banner */}
          <View className="bg-white p-3 rounded-2xl border border-slate-200 mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-9 h-9 rounded-xl bg-blue-50 items-center justify-center mr-2.5 border border-blue-200">
                <BusIcon size={18} color="#2563EB" />
              </View>
              <View>
                <Text className="text-slate-900 font-extrabold text-xs">
                  Bus: {route.activeBus.plateNumber}
                </Text>
                <Text className="text-slate-500 text-[11px] font-medium">
                  {route.activeBus.statusNote}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={onOpenCrewInfo}
              className="bg-slate-900 px-3 py-1.5 rounded-xl"
            >
              <Text className="text-white text-xs font-bold">Crew Info</Text>
            </TouchableOpacity>
          </View>

          {/* Timeline of Stops */}
          <Text className="text-slate-900 text-sm font-extrabold mb-2 tracking-wide uppercase">
            Scheduled Stops & Timing
          </Text>
          <StopsTimeline stops={route.stops} activeStopId={route.activeBus.nextStopId} />

          {/* Action to Track this route live on map */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onTrackOnMap}
            className="w-full bg-blue-600 h-12 rounded-2xl items-center justify-center flex-row shadow-md mt-2"
          >
            <Navigation size={18} color="#FFFFFF" strokeWidth={2.5} />
            <Text className="text-white text-sm font-black ml-2 tracking-wide">
              Track {route.routeNumber} Live on Map
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
