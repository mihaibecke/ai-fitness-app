import { Tabs, Stack } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';  // Import TouchableOpacity
import { useRouter } from 'expo-router';  // Import useRouter from expo-router
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();  // Initialize useRouter() to handle navigation

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false, 
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { 
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"  // Home screen
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      
      <Tabs.Screen
        name="exercise"  // Exercise screen
        options={{
          title: 'Exercises',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="figure.run.square.stack.fill" color={color} />,
          tabBarStyle: { display: 'none'},
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 10}}
              >
                <IconSymbol
                size={28}
                name="arrow.left"
                color={Colors[colorScheme ?? 'light'].tint}
                />
              </TouchableOpacity>
          ),
        }}
      />


      <Tabs.Screen
        name="chatbot"  // Chatbot screen
        options={{
          title: 'Chatbot',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.bubble.fill" color={color} />,
          tabBarStyle: { display: 'none' },  
          headerShown: true, 
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}  
              style={{ paddingLeft: 10 }} 
            >
              <IconSymbol
                size={28}
                name="arrow.left"
                color={Colors[colorScheme ?? 'light'].tint}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
    
  );
}
