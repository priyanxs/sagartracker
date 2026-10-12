import React from 'react';
import { View, Text } from 'react-native';
import { LiveStatus } from '../types';

interface StatusBadgeProps {
  status: LiveStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'ON_TIME':
        return {
          bg: 'bg-emerald-100 border-emerald-500',
          dot: 'bg-emerald-600',
          text: 'text-emerald-950 font-bold',
          label: 'ON TIME',
        };
      case 'DELAYED':
        return {
          bg: 'bg-rose-100 border-rose-500',
          dot: 'bg-rose-600',
          text: 'text-rose-950 font-bold',
          label: 'DELAYED',
        };
      case 'EARLY':
        return {
          bg: 'bg-blue-100 border-blue-500',
          dot: 'bg-blue-600',
          text: 'text-blue-950 font-bold',
          label: 'EARLY',
        };
      case 'STOPPED':
      default:
        return {
          bg: 'bg-slate-200 border-slate-400',
          dot: 'bg-slate-600',
          text: 'text-slate-800 font-bold',
          label: 'HALTED',
        };
    }
  };

  const config = getBadgeConfig();
  const paddingClass = size === 'sm' ? 'px-2 py-0.5' : size === 'lg' ? 'px-3.5 py-1.5' : 'px-2.5 py-1';
  const textSizeClass = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-sm' : 'text-xs';

  return (
    <View className={`flex-row items-center border ${config.bg} ${paddingClass} rounded-full`}>
      <View className={`w-2 h-2 rounded-full mr-1.5 ${config.dot}`} />
      <Text className={`${config.text} ${textSizeClass} tracking-wide`}>{config.label}</Text>
    </View>
  );
};
