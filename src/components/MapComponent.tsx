import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Bus, BusRoute } from '../types';
import { Bus as BusIcon, Navigation, MapPin, ZoomIn, ZoomOut, Compass } from 'lucide-react-native';
import Svg, { Path, Circle, Rect, Text as SvgText, G } from 'react-native-svg';

interface MapComponentProps {
  route: BusRoute;
  activeBus: Bus;
  onBusPress: () => void;
  onStopPress?: (stopId: string) => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Modular MapComponent supporting native react-native-maps with a robust
 * high-contrast daylight SVG vector fallback for universal web & emulator compatibility.
 */
export const MapComponent: React.FC<MapComponentProps> = ({
  route,
  activeBus,
  onBusPress,
  onStopPress,
}) => {
  // Try dynamic import or fallback to vector interactive map
  let NativeMapView: any = null;
  let NativeMarker: any = null;
  let NativePolyline: any = null;

  try {
    const Maps = require('react-native-maps');
    NativeMapView = Maps.default || Maps;
    NativeMarker = Maps.Marker;
    NativePolyline = Maps.Polyline;
  } catch (e) {
    // Graceful fallback to SVG Map
    NativeMapView = null;
  }

  const mapRef = useRef<any>(null);

  // Region for camera
  const initialRegion = {
    latitude: activeBus.currentCoordinates.latitude,
    longitude: activeBus.currentCoordinates.longitude,
    latitudeDelta: 0.045,
    longitudeDelta: 0.045,
  };

  useEffect(() => {
    if (mapRef.current && NativeMapView) {
      mapRef.current.animateToRegion(
        {
          latitude: activeBus.currentCoordinates.latitude,
          longitude: activeBus.currentCoordinates.longitude,
          latitudeDelta: 0.035,
          longitudeDelta: 0.035,
        },
        500
      );
    }
  }, [activeBus.currentCoordinates]);

  // If native maps are active and not on web
  if (NativeMapView && Platform.OS !== 'web') {
    return (
      <View style={StyleSheet.absoluteFillObject} className="bg-slate-100">
        <NativeMapView
          ref={mapRef}
          style={StyleSheet.absoluteFillObject}
          initialRegion={initialRegion}
          showsUserLocation={false}
          showsCompass={true}
          showsScale={true}
        >
          {/* Route Polyline */}
          {NativePolyline && (
            <NativePolyline
              coordinates={route.waypoints}
              strokeColor="#2563EB"
              strokeWidth={5}
              lineDashPattern={[0]}
            />
          )}

          {/* Bus Stops Markers */}
          {route.stops.map((stop, idx) => (
            <NativeMarker
              key={stop.id}
              coordinate={stop.coordinates}
              title={stop.name}
              description={`Scheduled: ${stop.scheduledTime}`}
              onPress={() => onStopPress && onStopPress(stop.id)}
            >
              <View
                className={`w-7 h-7 rounded-full items-center justify-center border-2 border-white shadow-md ${
                  stop.isPassed
                    ? 'bg-emerald-600'
                    : stop.isNext
                    ? 'bg-blue-600 ring-4 ring-blue-300'
                    : 'bg-slate-700'
                }`}
              >
                <Text className="text-white text-[11px] font-black">{idx + 1}</Text>
              </View>
            </NativeMarker>
          ))}

          {/* Active Bus Marker */}
          {NativeMarker && (
            <NativeMarker
              coordinate={activeBus.currentCoordinates}
              anchor={{ x: 0.5, y: 0.5 }}
              flat={true}
              rotation={activeBus.heading}
              onPress={onBusPress}
            >
              <TouchableOpacity activeOpacity={0.8} onPress={onBusPress}>
                <View className="items-center justify-center">
                  <View className="w-12 h-12 rounded-full bg-rose-600 border-3 border-white items-center justify-center shadow-2xl">
                    <BusIcon size={24} color="#FFFFFF" strokeWidth={2.5} />
                  </View>
                  <View className="bg-slate-900 px-2 py-0.5 rounded-md mt-1 border border-slate-700">
                    <Text className="text-white text-[10px] font-bold">{activeBus.plateNumber}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </NativeMarker>
          )}
        </NativeMapView>
      </View>
    );
  }

  // High-Contrast SVG Vector Map Fallback (Web, Emulators, or Standalone)
  return (
    <FallbackSvgMap
      route={route}
      activeBus={activeBus}
      onBusPress={onBusPress}
      onStopPress={onStopPress}
    />
  );
};

/**
 * Functional SVG Vector Map with coordinate normalization, high daylight contrast,
 * animated pulse, bus marker rotation, street grids, and stop landmarks.
 */
const FallbackSvgMap: React.FC<MapComponentProps> = ({
  route,
  activeBus,
  onBusPress,
  onStopPress,
}) => {
  // Determine coordinate bounding box
  const lats = route.waypoints.map((w) => w.latitude);
  const lngs = route.waypoints.map((w) => w.longitude);
  const minLat = Math.min(...lats) - 0.008;
  const maxLat = Math.max(...lats) + 0.008;
  const minLng = Math.min(...lngs) - 0.008;
  const maxLng = Math.max(...lngs) + 0.008;

  const mapWidth = SCREEN_WIDTH;
  const mapHeight = SCREEN_HEIGHT;

  // Convert GPS to SVG pixel coordinates
  const project = (coord: { latitude: number; longitude: number }) => {
    const x = ((coord.longitude - minLng) / (maxLng - minLng)) * (mapWidth - 80) + 40;
    // Latitude inverted for SVG y-axis
    const y = ((maxLat - coord.latitude) / (maxLat - minLat)) * (mapHeight - 260) + 100;
    return { x, y };
  };

  // Build SVG path string for the route polyline
  const polylinePath = route.waypoints.reduce((acc, coord, idx) => {
    const p = project(coord);
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const busPos = project(activeBus.currentCoordinates);

  return (
    <View style={StyleSheet.absoluteFillObject} className="bg-slate-100 overflow-hidden">
      {/* Background High-Contrast Map Graphic */}
      <Svg width={mapWidth} height={mapHeight} style={StyleSheet.absoluteFillObject}>
        {/* Subtle City Road Grid Pattern */}
        <G stroke="#E2E8F0" strokeWidth="1.5">
          {Array.from({ length: 15 }).map((_, i) => (
            <Path
              key={`h-${i}`}
              d={`M 0 ${i * 70} L ${mapWidth} ${i * 70}`}
              strokeDasharray="4,4"
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <Path
              key={`v-${i}`}
              d={`M ${i * 60} 0 L ${i * 60} ${mapHeight}`}
              strokeDasharray="4,4"
            />
          ))}
        </G>

        {/* Route Casing (Thick outline for daylight contrast) */}
        <Path
          d={polylinePath}
          fill="none"
          stroke="#1E3A8A"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Route Active Line */}
        <Path
          d={polylinePath}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Bus Stops */}
        {route.stops.map((stop, index) => {
          const pt = project(stop.coordinates);
          const isPassed = stop.isPassed;
          const isNext = stop.isNext;

          return (
            <G key={stop.id} onPress={() => onStopPress && onStopPress(stop.id)}>
              {/* Halos for Next Stop */}
              {isNext && (
                <Circle
                  cx={pt.x}
                  cy={pt.y}
                  r="18"
                  fill="#3B82F6"
                  fillOpacity="0.25"
                />
              )}

              {/* Stop Node */}
              <Circle
                cx={pt.x}
                cy={pt.y}
                r="11"
                fill={isPassed ? '#10B981' : isNext ? '#2563EB' : '#1E293B'}
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />

              {/* Sequence Number */}
              <SvgText
                x={pt.x}
                y={pt.y + 4}
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
              >
                {index + 1}
              </SvgText>

              {/* Stop Name Label */}
              <Rect
                x={pt.x + 14}
                y={pt.y - 12}
                width={Math.min(130, stop.name.length * 6.5 + 16)}
                height="22"
                rx="4"
                fill="#0F172A"
                fillOpacity="0.85"
              />
              <SvgText
                x={pt.x + 20}
                y={pt.y + 2}
                fill="#FFFFFF"
                fontSize="9.5"
                fontWeight="600"
              >
                {stop.name.length > 18 ? stop.name.substring(0, 16) + '...' : stop.name}
              </SvgText>
            </G>
          );
        })}

        {/* Bus Pulsing Halo */}
        <Circle
          cx={busPos.x}
          cy={busPos.y}
          r="26"
          fill="#E11D48"
          fillOpacity="0.25"
        />
        <Circle
          cx={busPos.x}
          cy={busPos.y}
          r="20"
          fill="#E11D48"
          fillOpacity="0.4"
        />
      </Svg>

      {/* Floating Animated Bus Marker Touch Target */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onBusPress}
        style={{
          position: 'absolute',
          left: busPos.x - 28,
          top: busPos.y - 36,
          zIndex: 50,
        }}
        className="items-center"
      >
        <View className="bg-rose-600 w-14 h-14 rounded-2xl items-center justify-center border-2 border-white shadow-2xl">
          <View style={{ transform: [{ rotate: `${activeBus.heading}deg` }] }}>
            <BusIcon size={26} color="#FFFFFF" strokeWidth={2.5} />
          </View>
        </View>

        {/* High contrast plate badge */}
        <View className="bg-slate-950 px-2 py-0.5 rounded shadow-lg border border-slate-700 mt-1 flex-row items-center">
          <View className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
          <Text className="text-white text-[10px] font-black tracking-wider">
            {activeBus.plateNumber}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Map Compass & Legend Pills */}
      <View className="absolute top-16 right-4 z-40 bg-white/95 px-3 py-2 rounded-2xl shadow-md border border-slate-200 items-center">
        <Compass size={22} color="#0F172A" />
        <Text className="text-[10px] font-bold text-slate-700 mt-0.5">GPS LIVE</Text>
      </View>
    </View>
  );
};
