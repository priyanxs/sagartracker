import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RouteStop, Bus } from '../types';
import { formatDistance } from '../utils/geoUtils';
import { StatusBadge } from './StatusBadge';
import { MapPin, Clock, Gauge, Users, ChevronRight, Navigation } from 'lucide-react-native';

interface NextStopCardProps {
  nextStop: RouteStop | null;
  distanceKm: number;
  etaMinutes: number;
  bus: Bus;
  onPressDetails: () => void;
  onPressTimeline?: () => void;
}

export const NextStopCard: React.FC<NextStopCardProps> = ({
  nextStop,
  distanceKm,
  etaMinutes,
  bus,
  onPressDetails,
  onPressTimeline,
}) => {
  if (!nextStop) return null;

  return (
    <View className="absolute bottom-6 left-4 right-4 z-40 bg-white rounded-3xl p-5 shadow-2xl border-2 border-slate-200">
      {/* Top Meta Header */}
      <View className="flex-row items-center justify-between pb-3 border-b border-slate-100">
        <View className="flex-row items-center">
          <View className="bg-blue-600 px-2.5 py-1 rounded-lg mr-2">
            <Text className="text-white text-xs font-black tracking-wide">NEXT STOP</Text>
          </View>
          <StatusBadge status={bus.status} size="sm" />
        </View>

        {/* Speedometer */}
        <View className="flex-row items-center bg-slate-100 px-2.5 py-1 rounded-lg">
          <Gauge size={13} color="#475569" />
          <Text className="text-slate-700 text-xs font-bold ml-1">
            {bus.currentSpeedKmh} km/h
          </Text>
        </View>
      </View>

      {/* Main Stop Name & Metrics */}
      <View className="py-3">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-3">
            <Text className="text-slate-950 text-xl font-extrabold tracking-tight" numberOfLines={1}>
              {nextStop.name}
            </Text>
            <View className="flex-row items-center mt-1">
              <MapPin size={13} color="#64748B" />
              <Text className="text-slate-500 text-xs font-medium ml-1 flex-1" numberOfLines={1}>
                {nextStop.landmark}
              </Text>
            </View>
          </View>

          {/* Large High-Contrast ETA Bubble */}
          <View className="bg-slate-900 rounded-2xl px-3.5 py-2 items-center justify-center min-w-[76px] shadow-sm">
            <Text className="text-yellow-400 text-xl font-black">{etaMinutes}m</Text>
            <Text className="text-slate-300 text-[10px] font-bold tracking-wider">ARRIVING</Text>
          </View>
        </View>
      </View>

      {/* Distance & Capacity Bar */}
      <View className="flex-row items-center justify-between bg-slate-50 p-2.5 rounded-xl mb-3 border border-slate-100">
        <View className="flex-row items-center">
          <Navigation size={14} color="#2563EB" />
          <Text className="text-slate-800 text-xs font-bold ml-1.5">
            {formatDistance(distanceKm)} away
          </Text>
        </View>

        <View className="flex-row items-center">
          <Users size={14} color="#475569" />
          <Text className="text-slate-600 text-xs font-semibold ml-1.5">
            Seats: <Text className="text-slate-900 font-bold">{bus.capacity - bus.occupiedSeats}</Text> left
          </Text>
        </View>
      </View>

      {/* Action Buttons with Large Mobile Tap Targets */}
      <View className="flex-row space-x-2">
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPressDetails}
          className="flex-1 bg-slate-900 h-12 rounded-2xl items-center justify-center flex-row shadow-md"
        >
          <Text className="text-white font-bold text-sm mr-1">Bus & Crew Details</Text>
          <ChevronRight size={16} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>

        {onPressTimeline && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressTimeline}
            className="bg-blue-50 border border-blue-200 h-12 px-4 rounded-2xl items-center justify-center flex-row"
          >
            <Text className="text-blue-700 font-bold text-sm">All Stops</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
