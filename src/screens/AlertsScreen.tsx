import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Linking, StatusBar } from 'react-native';
import { Header } from '../components/Header';
import {
  Bell,
  AlertTriangle,
  Clock,
  PhoneCall,
  Shield,
  CheckCircle,
  ChevronRight,
  Info,
} from 'lucide-react-native';

export const AlertsScreen: React.FC = () => {
  const [notifyNextStop, setNotifyNextStop] = useState(true);
  const [notifyDelays, setNotifyDelays] = useState(true);
  const [notifyMorningDepart, setNotifyMorningDepart] = useState(false);

  const alerts = [
    {
      id: 'a1',
      type: 'warning',
      title: 'Route 2 Traffic Advisory',
      description: 'Heavy traffic near Hebbal Flyover due to road repair. Bus running 6 minutes behind schedule.',
      time: '10 mins ago',
      route: 'Route 2',
    },
    {
      id: 'a2',
      type: 'info',
      title: 'Exam Special Fleet Announced',
      description: 'Additional morning buses will depart 15 minutes early next week for Mid-Term examinations.',
      time: '1 hour ago',
      route: 'All Routes',
    },
    {
      id: 'a3',
      type: 'success',
      title: 'Route 1 On-Time Arrival',
      description: 'Bus KA-01-EQ-7742 has departed Corporation Subway on schedule.',
      time: '25 mins ago',
      route: 'Route 1',
    },
  ];

  return (
    <View className="flex-1 bg-slate-100">
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <Header title="Alerts & Schedule" subtitle="Transport Updates & Student Helpdesk" />

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Student Digital Bus Pass Card */}
        <View className="bg-gradient-to-r from-blue-700 to-indigo-900 bg-slate-900 rounded-3xl p-5 mb-5 border border-slate-700 shadow-md">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <Shield size={16} color="#60A5FA" />
              <Text className="text-blue-300 text-xs font-black uppercase tracking-wider ml-1.5">
                Active Student Pass
              </Text>
            </View>
            <View className="bg-emerald-500/20 border border-emerald-400 px-2 py-0.5 rounded-full">
              <Text className="text-emerald-300 text-[10px] font-black uppercase">VALID 2026-27</Text>
            </View>
          </View>

          <Text className="text-white text-lg font-black">Sagar Institute of Science & Technology</Text>
          <Text className="text-amber-400 text-xs font-bold mt-0.5">SISTec Bhopal • Transit Route 1 (Airport Exp)</Text>

          <View className="flex-row items-center justify-between mt-4 pt-3 border-t border-slate-800">
            <Text className="text-slate-400 text-xs font-medium">Pass ID: SISTEC-BP-88194</Text>
            <Text className="text-blue-400 text-xs font-bold">Boarding: Lalghati Square</Text>
          </View>
        </View>

        {/* Live Broadcast Alerts */}
        <Text className="text-slate-900 text-sm font-black uppercase tracking-wider mb-3">
          Live Broadcasts & Traffic
        </Text>

        {alerts.map((item) => (
          <View
            key={item.id}
            className="bg-white rounded-2xl p-4 mb-3 border-2 border-slate-200 shadow-sm"
          >
            <View className="flex-row items-center justify-between mb-1.5">
              <View className="flex-row items-center">
                {item.type === 'warning' ? (
                  <AlertTriangle size={16} color="#DC2626" />
                ) : item.type === 'success' ? (
                  <CheckCircle size={16} color="#16A34A" />
                ) : (
                  <Info size={16} color="#2563EB" />
                )}
                <Text className="text-slate-900 font-extrabold text-sm ml-2">
                  {item.title}
                </Text>
              </View>
              <Text className="text-slate-400 text-[11px] font-semibold">{item.time}</Text>
            </View>

            <Text className="text-slate-600 text-xs font-medium leading-relaxed">
              {item.description}
            </Text>

            <View className="mt-2.5 pt-2 border-t border-slate-100 flex-row justify-between items-center">
              <Text className="text-blue-600 text-[11px] font-black">{item.route}</Text>
              <Text className="text-slate-400 text-[11px]">Campus Operations</Text>
            </View>
          </View>
        ))}

        {/* Notification Preferences */}
        <Text className="text-slate-900 text-sm font-black uppercase tracking-wider mt-4 mb-3">
          Push Notification Preferences
        </Text>

        <View className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm space-y-4">
          <View className="flex-row items-center justify-between py-1 border-b border-slate-100 pb-3">
            <View className="flex-1 pr-3">
              <Text className="text-slate-900 font-bold text-sm">Next Stop Proximity Alert</Text>
              <Text className="text-slate-500 text-xs">Vibrate when bus is 2 stops away</Text>
            </View>
            <Switch
              value={notifyNextStop}
              onValueChange={setNotifyNextStop}
              trackColor={{ false: '#cbd5e1', true: '#2563eb' }}
            />
          </View>

          <View className="flex-row items-center justify-between py-1 border-b border-slate-100 pb-3">
            <View className="flex-1 pr-3">
              <Text className="text-slate-900 font-bold text-sm">Delay & Incident Alerts</Text>
              <Text className="text-slate-500 text-xs">Notify if bus delay exceeds 5 minutes</Text>
            </View>
            <Switch
              value={notifyDelays}
              onValueChange={setNotifyDelays}
              trackColor={{ false: '#cbd5e1', true: '#2563eb' }}
            />
          </View>

          <View className="flex-row items-center justify-between py-1">
            <View className="flex-1 pr-3">
              <Text className="text-slate-900 font-bold text-sm">Morning Departure Bell</Text>
              <Text className="text-slate-500 text-xs">Reminder at 07:15 AM</Text>
            </View>
            <Switch
              value={notifyMorningDepart}
              onValueChange={setNotifyMorningDepart}
              trackColor={{ false: '#cbd5e1', true: '#2563eb' }}
            />
          </View>
        </View>

        {/* Emergency Transport Help Desk */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => Linking.openURL('tel:+917552499999')}
          className="mt-5 bg-rose-600 p-4 rounded-2xl flex-row items-center justify-between shadow-md"
        >
          <View className="flex-row items-center">
            <PhoneCall size={20} color="#FFFFFF" strokeWidth={2.5} />
            <View className="ml-3">
              <Text className="text-white font-black text-sm">SISTec Central Transport Desk</Text>
              <Text className="text-rose-100 text-xs font-semibold">+91 755 2499999 (24x7 Control Room)</Text>
            </View>
          </View>
          <ChevronRight size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
