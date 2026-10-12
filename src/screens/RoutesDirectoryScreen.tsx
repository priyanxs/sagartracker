import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useBusTracking } from '../context/BusTrackingContext';
import { RouteCard } from '../components/RouteCard';
import { BusCrewModal } from '../components/BusCrewModal';
import { Header } from '../components/Header';
import { Search, X, SlidersHorizontal, Bus, Navigation } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const RoutesDirectoryScreen: React.FC = () => {
  const {
    routes,
    selectRoute,
    openCrewModal,
    isCrewModalOpen,
    closeCrewModal,
    modalBus,
    activeBus,
  } = useBusTracking();

  const navigation = useNavigation<any>();

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'MORNING' | 'DELAYED'>('ALL');
  const [expandedRouteId, setExpandedRouteId] = useState<string | null>('route-1');

  // Filtered routes based on search text and active tab
  const filteredRoutes = useMemo(() => {
    return routes.filter((route) => {
      const matchesSearch =
        route.routeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.stops.some(
          (s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.landmark.toLowerCase().includes(searchQuery.toLowerCase())
        );

      if (!matchesSearch) return false;

      if (activeFilter === 'MORNING') {
        return route.shift === 'Morning Pickup';
      }
      if (activeFilter === 'DELAYED') {
        return route.activeBus.status === 'DELAYED';
      }

      return true;
    });
  }, [routes, searchQuery, activeFilter]);

  const handleToggleExpand = (routeId: string) => {
    setExpandedRouteId((prev) => (prev === routeId ? null : routeId));
  };

  const handleTrackOnMap = (routeId: string) => {
    selectRoute(routeId);
    navigation.navigate('LiveTracking');
  };

  return (
    <View className="flex-1 bg-slate-100">
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* Header */}
      <Header
        title="College Routes"
        subtitle="Schedules, Stops & Live Status"
        showRouteSelector={false}
      />

      <View className="p-4 pb-2">
        {/* Search Bar with High Sunlight Contrast */}
        <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 border-2 border-slate-300 shadow-sm">
          <Search size={18} color="#475569" />
          <TextInput
            placeholder="Search route, stop or area (e.g. Metro, Route 1)..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-2 text-slate-950 font-bold text-sm"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} className="p-1">
              <X size={16} color="#64748B" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Chips */}
        <View className="flex-row items-center space-x-2 mt-3">
          <TouchableOpacity
            onPress={() => setActiveFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-full border ${
              activeFilter === 'ALL'
                ? 'bg-slate-900 border-slate-900'
                : 'bg-white border-slate-300'
            }`}
          >
            <Text
              className={`text-xs font-black ${
                activeFilter === 'ALL' ? 'text-white' : 'text-slate-700'
              }`}
            >
              All Routes ({routes.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveFilter('MORNING')}
            className={`px-3.5 py-1.5 rounded-full border ${
              activeFilter === 'MORNING'
                ? 'bg-slate-900 border-slate-900'
                : 'bg-white border-slate-300'
            }`}
          >
            <Text
              className={`text-xs font-black ${
                activeFilter === 'MORNING' ? 'text-white' : 'text-slate-700'
              }`}
            >
              Morning Pickup
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveFilter('DELAYED')}
            className={`px-3.5 py-1.5 rounded-full border ${
              activeFilter === 'DELAYED'
                ? 'bg-rose-600 border-rose-600'
                : 'bg-white border-slate-300'
            }`}
          >
            <Text
              className={`text-xs font-black ${
                activeFilter === 'DELAYED' ? 'text-white' : 'text-slate-700'
              }`}
            >
              Delayed Only
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Routes List */}
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingTop: 6, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredRoutes.length === 0 ? (
          <View className="items-center justify-center py-16 bg-white rounded-3xl border border-slate-200 mt-4">
            <Bus size={42} color="#94A3B8" />
            <Text className="text-slate-900 text-lg font-black mt-3">No routes found</Text>
            <Text className="text-slate-500 text-xs mt-1">
              Try searching with another keyword or reset filters.
            </Text>
          </View>
        ) : (
          filteredRoutes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              isExpanded={expandedRouteId === route.id}
              onToggleExpand={() => handleToggleExpand(route.id)}
              onTrackOnMap={() => handleTrackOnMap(route.id)}
              onOpenCrewInfo={() => openCrewModal(route.activeBus)}
            />
          ))
        )}
      </ScrollView>

      {/* Crew Info Modal */}
      <BusCrewModal
        visible={isCrewModalOpen}
        bus={modalBus || activeBus}
        onClose={closeCrewModal}
      />
    </View>
  );
};
