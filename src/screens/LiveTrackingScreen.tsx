import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { useBusTracking } from '../context/BusTrackingContext';
import { MapComponent } from '../components/MapComponent';
import { NextStopCard } from '../components/NextStopCard';
import { BusCrewModal } from '../components/BusCrewModal';
import { SimulationControls } from '../components/SimulationControls';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';

export const LiveTrackingScreen: React.FC = () => {
  const {
    selectedRoute,
    activeBus,
    nextStop,
    distanceToNextStopKm,
    etaToNextStopMinutes,
    isCrewModalOpen,
    openCrewModal,
    closeCrewModal,
    modalBus,
    isSimulating,
    simulationSpeed,
    advanceSimulationStep,
  } = useBusTracking();

  const navigation = useNavigation<any>();

  /**
   * 1. Live Tracking Simulation Hook:
   * Uses useEffect with setInterval to simulate the bus moving along mock coordinates in real time.
   */
  useEffect(() => {
    if (!isSimulating) return;

    const intervalMs = Math.max(300, 1500 / simulationSpeed);
    const intervalId = setInterval(() => {
      advanceSimulationStep();
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [isSimulating, simulationSpeed, advanceSimulationStep]);

  return (
    <View className="flex-1 bg-slate-900">
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* High-Contrast Top App Bar with Branding */}
      <Header
        title="Live Fleet Tracker"
        subtitle={`${selectedRoute.routeNumber} • ${selectedRoute.title}`}
        showRouteSelector={true}
      />

      {/* Floating Simulation Playback & Speed Multiplier HUD */}
      <SimulationControls />

      {/* 1. Full-Screen Map Area with Bus Marker */}
      <View className="flex-1 relative">
        <MapComponent
          route={selectedRoute}
          activeBus={activeBus}
          onBusPress={() => openCrewModal(activeBus)}
          onStopPress={(stopId) => {
            // Focus stop node
          }}
        />

        {/* 1. Floating 'Next Stop' Card Overlay */}
        <NextStopCard
          nextStop={nextStop}
          distanceKm={distanceToNextStopKm}
          etaMinutes={etaToNextStopMinutes}
          bus={activeBus}
          onPressDetails={() => openCrewModal(activeBus)}
          onPressTimeline={() => navigation.navigate('RoutesDirectory')}
        />
      </View>

      {/* 3. Bus & Crew Bottom Sheet / Modal */}
      <BusCrewModal
        visible={isCrewModalOpen}
        bus={modalBus || activeBus}
        onClose={closeCrewModal}
      />
    </View>
  );
};
