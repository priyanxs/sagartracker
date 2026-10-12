import React from 'react';
import { View, Text } from 'react-native';
import { RouteStop } from '../types';
import { Check, Clock, MapPin, Radio } from 'lucide-react-native';

interface StopsTimelineProps {
  stops: RouteStop[];
  activeStopId?: string;
}

export const StopsTimeline: React.FC<StopsTimelineProps> = ({ stops, activeStopId }) => {
  return (
    <View className="py-2">
      {stops.map((stop, index) => {
        const isFirst = index === 0;
        const isLast = index === stops.length - 1;
        const isPassed = stop.isPassed;
        const isNext = stop.isNext || stop.id === activeStopId;

        return (
          <View key={stop.id} className="flex-row">
            {/* Timeline Left: Status Node & Connecting Line */}
            <View className="items-center w-10">
              {/* Connecting line top */}
              {!isFirst && (
                <View
                  className={`w-1 flex-1 ${
                    isPassed ? 'bg-emerald-500' : isNext ? 'bg-blue-400' : 'bg-slate-300'
                  }`}
                />
              )}

              {/* Node Icon Indicator */}
              <View
                className={`w-8 h-8 rounded-full items-center justify-center my-1 border-2 ${
                  isPassed
                    ? 'bg-emerald-600 border-emerald-200'
                    : isNext
                    ? 'bg-blue-600 border-white ring-4 ring-blue-200'
                    : 'bg-white border-slate-400'
                }`}
              >
                {isPassed ? (
                  <Check size={16} color="#FFFFFF" strokeWidth={3} />
                ) : isNext ? (
                  <Radio size={16} color="#FFFFFF" strokeWidth={3} />
                ) : (
                  <Text className="text-slate-600 font-bold text-xs">{stop.sequence}</Text>
                )}
              </View>

              {/* Connecting line bottom */}
              {!isLast && (
                <View
                  className={`w-1 flex-1 ${
                    isPassed ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                />
              )}
            </View>

            {/* Timeline Right: Stop Information & Times */}
            <View className="flex-1 pl-3 pb-6 pt-1">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1 mr-2">
                  <Text
                    className={`text-base ${
                      isNext
                        ? 'text-blue-900 font-black'
                        : isPassed
                        ? 'text-slate-500 font-semibold line-through decoration-slate-300'
                        : 'text-slate-900 font-bold'
                    }`}
                    numberOfLines={1}
                  >
                    {stop.name}
                  </Text>
                  {isNext && (
                    <View className="bg-blue-600 px-2 py-0.5 rounded ml-2">
                      <Text className="text-white text-[10px] font-black uppercase">Next</Text>
                    </View>
                  )}
                </View>

                {/* Scheduled & Estimated Times */}
                <View className="items-end">
                  <Text className="text-slate-900 text-xs font-black">{stop.scheduledTime}</Text>
                  {isNext && (
                    <Text className="text-blue-600 text-[11px] font-bold">
                      Est. {stop.estimatedTime}
                    </Text>
                  )}
                </View>
              </View>

              {/* Landmark & Distance */}
              <View className="flex-row items-center mt-1">
                <MapPin size={12} color="#64748B" />
                <Text className="text-slate-500 text-xs ml-1 flex-1" numberOfLines={1}>
                  {stop.landmark}
                </Text>
                {stop.distanceFromPreviousKm > 0 && (
                  <Text className="text-slate-400 text-[11px] font-medium ml-2">
                    +{stop.distanceFromPreviousKm} km
                  </Text>
                )}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};
