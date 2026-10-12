export interface Coordinates {
  latitude: number;
  longitude: number;
}

export type LiveStatus = 'ON_TIME' | 'DELAYED' | 'EARLY' | 'STOPPED';

export interface RouteStop {
  id: string;
  name: string;
  sequence: number;
  scheduledTime: string;
  estimatedTime: string;
  coordinates: Coordinates;
  landmark: string;
  isPassed: boolean;
  isNext: boolean;
  distanceFromPreviousKm: number;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  photoUrl: string;
  rating: number;
  experienceYears: number;
  badgeNumber: string;
}

export interface Conductor {
  id: string;
  name: string;
  phone: string;
  photoUrl: string;
  employeeId: string;
}

export interface Bus {
  id: string;
  routeId: string;
  plateNumber: string;
  capacity: number;
  occupiedSeats: number;
  status: LiveStatus;
  statusNote: string;
  currentSpeedKmh: number;
  heading: number;
  currentCoordinates: Coordinates;
  currentWaypointIndex: number;
  currentStopIndex: number;
  nextStopId: string;
  driver: Driver;
  conductor: Conductor;
}

export interface BusRoute {
  id: string;
  routeNumber: string;
  title: string;
  origin: string;
  destination: string;
  shift: 'Morning Pickup' | 'Evening Drop';
  departureTime: string;
  arrivalTime: string;
  estimatedDurationMinutes: number;
  totalDistanceKm: number;
  color: string;
  stops: RouteStop[];
  waypoints: Coordinates[];
  activeBus: Bus;
}

export interface TrackingState {
  routes: BusRoute[];
  selectedRouteId: string;
  selectedBusId: string | null;
  isSimulating: boolean;
  simulationSpeed: number; // 1x, 2x, 5x
  isCrewModalOpen: boolean;
  activeBusForModal: Bus | null;
  searchQuery: string;
  selectedFilter: 'ALL' | 'MORNING' | 'EVENING' | 'ACTIVE';
}

export type RootTabParamList = {
  LiveTracking: undefined;
  RoutesDirectory: undefined;
  Alerts: undefined;
};
