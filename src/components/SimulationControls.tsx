import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useBusTracking } from '../context/BusTrackingContext';
import { Play, Pause, RotateCcw, Zap } from 'lucide-react-native';

export const SimulationControls: React.FC = () => {
  const {
    isSimulating,
    toggleSimulation,
    simulationSpeed,
    setSimulationSpeed,
    resetSimulation,
  } = useBusTracking();

  const speeds = [1, 2, 5];

  return (
    <View className="absolute top-28 left-4 right-4 z-30 bg-slate-900/90 backdrop-blur-md rounded-2xl px-4 py-2.5 flex-row items-center justify-between border border-slate-700 shadow-xl">
      {/* Simulation status pill */}
      <View className="flex-row items-center">
        <View
          className={`w-2.5 h-2.5 rounded-full mr-2 ${
            isSimulating ? 'bg-emerald-400' : 'bg-amber-400'
          }`}
        />
        <Text className="text-white text-xs font-black tracking-wide">
          {isSimulating ? 'SIMULATION LIVE' : 'PAUSED'}
        </Text>
      </View>

      {/* Action Buttons */}
      <View className="flex-row items-center space-x-2">
        {/* Play/Pause */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={toggleSimulation}
          className="w-8 h-8 rounded-xl bg-slate-800 items-center justify-center border border-slate-700"
        >
          {isSimulating ? (
            <Pause size={14} color="#FFFFFF" />
          ) : (
            <Play size={14} color="#FFFFFF" />
          )}
        </TouchableOpacity>

        {/* Speed multiplier toggle */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            const nextIdx = (speeds.indexOf(simulationSpeed) + 1) % speeds.length;
            setSimulationSpeed(speeds[nextIdx]);
          }}
          className="bg-blue-600 px-2.5 py-1.5 rounded-xl flex-row items-center border border-blue-500"
        >
          <Zap size={12} color="#FFFFFF" />
          <Text className="text-white text-xs font-black ml-1">{simulationSpeed}x</Text>
        </TouchableOpacity>

        {/* Reset */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={resetSimulation}
          className="w-8 h-8 rounded-xl bg-slate-800 items-center justify-center border border-slate-700"
        >
          <RotateCcw size={13} color="#94A3B8" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
