import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { Bus } from '../types';
import { StatusBadge } from './StatusBadge';
import {
  X,
  Phone,
  Star,
  Award,
  Users,
  ShieldCheck,
  Bus as BusIcon,
  AlertCircle,
  Clock,
  Sparkles,
} from 'lucide-react-native';

interface BusCrewModalProps {
  visible: boolean;
  bus: Bus | null;
  onClose: () => void;
}

export const BusCrewModal: React.FC<BusCrewModalProps> = ({ visible, bus, onClose }) => {
  if (!bus) return null;

  const occupancyPercentage = Math.round((bus.occupiedSeats / bus.capacity) * 100);
  const availableSeats = bus.capacity - bus.occupiedSeats;

  const handleCallConductor = () => {
    const phoneUrl = `tel:${bus.conductor.phone}`;
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneUrl);
        } else {
          Alert.alert('Phone Call', `Direct dial: ${bus.conductor.phone}`);
        }
      })
      .catch(() => {
        Alert.alert('Calling Conductor', `Dialing ${bus.conductor.phone}`);
      });
  };

  const handleCallHelpline = () => {
    Linking.openURL('tel:+918023456789').catch(() => {
      Alert.alert('Helpline', 'College Transport Desk: +91 80 2345 6789');
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      {/* Semi-transparent Dim Backdrop */}
      <View className="flex-1 justify-end bg-black/60">
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          className="flex-1"
        />

        {/* Bottom Sheet Container */}
        <View className="bg-white rounded-t-[36px] max-h-[85%] border-t-2 border-slate-200 shadow-2xl overflow-hidden">
          {/* Top Drag Notch Handle */}
          <View className="items-center pt-3 pb-2">
            <View className="w-12 h-1.5 bg-slate-300 rounded-full" />
          </View>

          {/* Header Title with Close Icon */}
          <View className="flex-row items-center justify-between px-6 pb-4 border-b border-slate-100">
            <View>
              <Text className="text-slate-900 text-2xl font-black tracking-tight">
                Bus & Crew Details
              </Text>
              <Text className="text-slate-500 text-xs font-semibold">
                Live College Fleet Information
              </Text>
            </View>

            <TouchableOpacity
              onPress={onClose}
              className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center border border-slate-200"
              accessibilityLabel="Close modal"
            >
              <X size={20} color="#0F172A" />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 36 }}
            showsVerticalScrollIndicator={false}
          >
            {/* 1. BUS SPECIFICATION & NUMBER PLATE */}
            <View className="bg-slate-900 rounded-3xl p-5 mb-5 shadow-lg border border-slate-800">
              {/* Authentic Indian Vehicle License Plate */}
              <View className="bg-yellow-400 border-2 border-yellow-500 rounded-xl px-4 py-2 flex-row items-center justify-between mb-4 shadow-sm">
                <View className="flex-row items-center">
                  <View className="bg-blue-900 px-1 py-0.5 rounded mr-2">
                    <Text className="text-white text-[9px] font-black">IND</Text>
                  </View>
                  <Text className="text-slate-950 font-black text-xl tracking-widest">
                    {bus.plateNumber}
                  </Text>
                </View>
                <View className="bg-slate-950 px-2 py-0.5 rounded">
                  <Text className="text-yellow-400 text-[10px] font-bold">COLLEGE FLEET</Text>
                </View>
              </View>

              {/* Status and Speed Row */}
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <StatusBadge status={bus.status} size="md" />
                </View>
                <Text className="text-slate-300 text-xs font-bold">
                  Speed: <Text className="text-white font-extrabold">{bus.currentSpeedKmh} km/h</Text>
                </Text>
              </View>

              {/* Live Note */}
              <View className="bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700/60 mb-4">
                <Text className="text-slate-200 text-xs font-medium">
                  Status: {bus.statusNote}
                </Text>
              </View>

              {/* Seating Capacity Progress Meter */}
              <View className="pt-2 border-t border-slate-800">
                <View className="flex-row justify-between items-center mb-2">
                  <View className="flex-row items-center">
                    <Users size={15} color="#94A3B8" />
                    <Text className="text-slate-300 text-xs font-bold ml-1.5">
                      Seating Capacity
                    </Text>
                  </View>
                  <Text className="text-white text-xs font-black">
                    {bus.occupiedSeats} / {bus.capacity} seats ({occupancyPercentage}% full)
                  </Text>
                </View>

                {/* Visual Bar */}
                <View className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <View
                    style={{ width: `${occupancyPercentage}%` }}
                    className={`h-full rounded-full ${
                      occupancyPercentage > 85 ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                  />
                </View>

                <Text className="text-slate-400 text-[11px] font-semibold mt-1.5 text-right">
                  {availableSeats > 0 ? `${availableSeats} seats currently available` : 'Full capacity'}
                </Text>
              </View>
            </View>

            {/* 2. DRIVER INFO CARD */}
            <View className="bg-white rounded-3xl p-5 mb-5 border-2 border-slate-200 shadow-sm">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-slate-500 text-xs font-black uppercase tracking-wider">
                  Assigned Driver
                </Text>
                <View className="flex-row items-center bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  <ShieldCheck size={12} color="#2563EB" />
                  <Text className="text-blue-700 text-[11px] font-bold ml-1">Verified</Text>
                </View>
              </View>

              <View className="flex-row items-center">
                {/* Profile Picture Placeholder */}
                <Image
                  source={{ uri: bus.driver.photoUrl }}
                  className="w-16 h-16 rounded-2xl bg-slate-200 border-2 border-slate-300"
                />

                <View className="flex-1 ml-4">
                  <Text className="text-slate-950 text-lg font-extrabold tracking-tight">
                    {bus.driver.name}
                  </Text>
                  <Text className="text-slate-500 text-xs font-medium">
                    Badge: {bus.driver.badgeNumber}
                  </Text>

                  {/* Rating and Experience Tags */}
                  <View className="flex-row items-center space-x-2 mt-2">
                    <View className="flex-row items-center bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                      <Star size={12} color="#D97706" fill="#D97706" />
                      <Text className="text-amber-900 text-xs font-black ml-1">
                        {bus.driver.rating.toFixed(1)}
                      </Text>
                    </View>

                    <View className="flex-row items-center bg-slate-100 px-2 py-0.5 rounded-lg">
                      <Award size={12} color="#475569" />
                      <Text className="text-slate-700 text-xs font-bold ml-1">
                        {bus.driver.experienceYears} yrs exp
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* 3. CONDUCTOR INFO & CALL ACTION */}
            <View className="bg-white rounded-3xl p-5 mb-5 border-2 border-slate-200 shadow-sm">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-slate-500 text-xs font-black uppercase tracking-wider">
                  Assigned Conductor
                </Text>
                <Text className="text-slate-400 text-xs font-semibold">
                  ID: {bus.conductor.employeeId}
                </Text>
              </View>

              <View className="flex-row items-center mb-4">
                <Image
                  source={{ uri: bus.conductor.photoUrl }}
                  className="w-16 h-16 rounded-2xl bg-slate-200 border-2 border-slate-300"
                />

                <View className="flex-1 ml-4">
                  <Text className="text-slate-950 text-lg font-extrabold tracking-tight">
                    {bus.conductor.name}
                  </Text>
                  <Text className="text-slate-500 text-xs font-medium">
                    Contact: {bus.conductor.phone}
                  </Text>
                  <Text className="text-emerald-700 text-[11px] font-bold mt-1">
                    • Active on duty
                  </Text>
                </View>
              </View>

              {/* PROMINENT "CALL CONDUCTOR" BUTTON */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleCallConductor}
                className="w-full bg-emerald-600 h-14 rounded-2xl items-center justify-center flex-row shadow-lg active:bg-emerald-700 border-2 border-emerald-500"
                accessibilityLabel="Call Conductor"
              >
                <View className="w-8 h-8 rounded-full bg-white/20 items-center justify-center mr-2">
                  <Phone size={18} color="#FFFFFF" strokeWidth={2.5} />
                </View>
                <Text className="text-white text-base font-black tracking-wide">
                  Call Conductor ({bus.conductor.name})
                </Text>
              </TouchableOpacity>
            </View>

            {/* Emergency & College Transport Desk Support */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleCallHelpline}
              className="flex-row items-center justify-center p-3.5 rounded-2xl bg-slate-100 border border-slate-300 mb-2"
            >
              <AlertCircle size={16} color="#475569" />
              <Text className="text-slate-700 text-xs font-bold ml-2">
                Need Help? Contact College Transport Desk
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
