import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Bus, BusRoute, RouteStop, TrackingState } from '../types';
import { INITIAL_MOCK_ROUTES } from '../data/mockData';
import { calculateBearing, calculateDistanceKm, estimateArrivalMinutes } from '../utils/geoUtils';

interface BusTrackingContextType {
  routes: BusRoute[];
  selectedRoute: BusRoute;
  selectedRouteId: string;
  selectRoute: (routeId: string) => void;
  activeBus: Bus;
  isSimulating: boolean;
  toggleSimulation: () => void;
  simulationSpeed: number;
  setSimulationSpeed: (speed: number) => void;
  resetSimulation: () => void;
  advanceSimulationStep: () => void;
  
  // Modal State
  isCrewModalOpen: boolean;
  openCrewModal: (bus?: Bus) => void;
  closeCrewModal: () => void;
  modalBus: Bus | null;

  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilter: 'ALL' | 'MORNING' | 'EVENING' | 'ACTIVE';
  setSelectedFilter: (filter: 'ALL' | 'MORNING' | 'EVENING' | 'ACTIVE') => void;

  // Next Stop Real-time Data
  nextStop: RouteStop | null;
  distanceToNextStopKm: number;
  etaToNextStopMinutes: number;
}

const BusTrackingContext = createContext<BusTrackingContextType | undefined>(undefined);

export const BusTrackingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [routes, setRoutes] = useState<BusRoute[]>(INITIAL_MOCK_ROUTES);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('route-1');
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(1);
  const [isCrewModalOpen, setIsCrewModalOpen] = useState<boolean>(false);
  const [modalBus, setModalBus] = useState<Bus | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'MORNING' | 'EVENING' | 'ACTIVE'>('ALL');

  // Currently selected route
  const selectedRoute = useMemo(() => {
    return routes.find((r) => r.id === selectedRouteId) || routes[0];
  }, [routes, selectedRouteId]);

  const activeBus = selectedRoute.activeBus;

  // Next stop calculation
  const nextStop = useMemo(() => {
    return selectedRoute.stops.find((s) => s.id === activeBus.nextStopId) || selectedRoute.stops[0];
  }, [selectedRoute, activeBus.nextStopId]);

  const distanceToNextStopKm = useMemo(() => {
    if (!nextStop) return 0;
    return calculateDistanceKm(activeBus.currentCoordinates, nextStop.coordinates);
  }, [activeBus.currentCoordinates, nextStop]);

  const etaToNextStopMinutes = useMemo(() => {
    return estimateArrivalMinutes(distanceToNextStopKm, activeBus.currentSpeedKmh || 30);
  }, [distanceToNextStopKm, activeBus.currentSpeedKmh]);

  // Core simulation advancement step
  const advanceSimulationStep = React.useCallback(() => {
    setRoutes((prevRoutes) => {
      return prevRoutes.map((route) => {
        if (route.id !== selectedRouteId) return route;

        const waypoints = route.waypoints;
        const currentIdx = route.activeBus.currentWaypointIndex;
        const nextIdx = (currentIdx + 1) % waypoints.length;

        const currentCoord = waypoints[currentIdx];
        const nextCoord = waypoints[nextIdx];

        // Calculate new heading angle
        const newHeading = calculateBearing(currentCoord, nextCoord);

        let updatedNextStopId = route.activeBus.nextStopId;
        let updatedCurrentStopIdx = route.activeBus.currentStopIndex;

        const updatedStops = route.stops.map((stop, sIdx) => {
          const dist = calculateDistanceKm(nextCoord, stop.coordinates);
          if (dist < 0.35 && sIdx >= updatedCurrentStopIdx) {
            updatedCurrentStopIdx = sIdx;
            const upcomingStop = route.stops[sIdx + 1];
            if (upcomingStop) {
              updatedNextStopId = upcomingStop.id;
            }
            return { ...stop, isPassed: true, isNext: false };
          }

          if (stop.id === updatedNextStopId) {
            return { ...stop, isPassed: false, isNext: true };
          }

          return {
            ...stop,
            isPassed: sIdx < updatedCurrentStopIdx,
            isNext: sIdx === updatedCurrentStopIdx + 1,
          };
        });

        const randomSpeedFluctuation = Math.floor(Math.random() * 5) - 2;
        const baseSpeed = route.activeBus.status === 'DELAYED' ? 22 : 36;
        const updatedSpeed = Math.max(15, Math.min(55, baseSpeed + randomSpeedFluctuation));

        const updatedBus: Bus = {
          ...route.activeBus,
          currentCoordinates: nextCoord,
          currentWaypointIndex: nextIdx,
          heading: newHeading,
          currentSpeedKmh: updatedSpeed,
          currentStopIndex: updatedCurrentStopIdx,
          nextStopId: updatedNextStopId,
        };

        return {
          ...route,
          stops: updatedStops,
          activeBus: updatedBus,
        };
      });
    });
  }, [selectedRouteId]);

  // Real-time movement simulation using useEffect and setInterval
  useEffect(() => {
    if (!isSimulating) return;

    const intervalTime = Math.max(300, 1500 / simulationSpeed);
    const intervalId = setInterval(() => {
      advanceSimulationStep();
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, [isSimulating, simulationSpeed, advanceSimulationStep]);

  const selectRoute = (routeId: string) => {
    setSelectedRouteId(routeId);
  };

  const toggleSimulation = () => {
    setIsSimulating((prev) => !prev);
  };

  const resetSimulation = () => {
    setRoutes(INITIAL_MOCK_ROUTES);
  };

  const openCrewModal = (bus?: Bus) => {
    setModalBus(bus || activeBus);
    setIsCrewModalOpen(true);
  };

  const closeCrewModal = () => {
    setIsCrewModalOpen(false);
  };

  return (
    <BusTrackingContext.Provider
      value={{
        routes,
        selectedRoute,
        selectedRouteId,
        selectRoute,
        activeBus,
        isSimulating,
        toggleSimulation,
        simulationSpeed,
        setSimulationSpeed,
        resetSimulation,
    advanceSimulationStep,
        isCrewModalOpen,
        openCrewModal,
        closeCrewModal,
        modalBus,
        searchQuery,
        setSearchQuery,
        selectedFilter,
        setSelectedFilter,
        nextStop,
        distanceToNextStopKm,
        etaToNextStopMinutes,
      }}
    >
      {children}
    </BusTrackingContext.Provider>
  );
};

export const useBusTracking = (): BusTrackingContextType => {
  const context = useContext(BusTrackingContext);
  if (!context) {
    throw new Error('useBusTracking must be used within a BusTrackingProvider');
  }
  return context;
};
