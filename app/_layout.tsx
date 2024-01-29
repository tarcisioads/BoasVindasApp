import { Stack } from 'expo-router'; 
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayoutNav() {
  const navigation = useNavigation();

  return (
    <ConvexProvider client={convex}>
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: '#EEA217',
        },
        headerTintColor: '#fff',
      }}>
          <Stack.Screen 
            name="login" 
            options={{ 
              headerTitle: 'Login',
              presentation: 'modal',
              gestureEnabled: false,
              headerLeft: () => (
                <Link href={'/'} asChild>
                  <TouchableOpacity>
                    <Ionicons name="close-outline" size-={32} color="white" />
                  </TouchableOpacity>
                </Link>
              ),
            }} 
          />
          <Stack.Screen 
            name="index"
            options={{
              headerTitle: 'Visitantes',
              headerLeft: () => (
                 <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}> 
                  <Link href={'/(user)/list'} asChild>
                    <TouchableOpacity>
                      <Ionicons name="people" size={32} color="white" />
                    </TouchableOpacity>
                  </Link>
                </View>
              ),
              headerRight: () => (
                <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}> 
                  <Link href={'/(modal)/create'} asChild>
                    <TouchableOpacity>
                      <Ionicons name="add" size={32} color="white" />
                    </TouchableOpacity>
                  </Link>
                  <Link href={'/profile'} asChild>
                    <TouchableOpacity>
                      <Ionicons name="person" size={32} color="white" />
                    </TouchableOpacity>
                  </Link>
                
                </View>
              ),
            }}
          />
          <Stack.Screen 
            name="(person)/[personid]" 
            options={{ 
              headerTitle: 'Test',
            }} 
          />
          <Stack.Screen
            name="(modal)/create"
            options={{
              headerTitle: 'Novo Visitante',
              presentation: 'modal',
              headerLeft: () => (
                <Link href={'/'} asChild>
                  <TouchableOpacity>
                    <Ionicons name="close-outline" size-={32} color="white" />
                  </TouchableOpacity>
                </Link>
              ),
            }}
          />
          <Stack.Screen
            name="(user)/list"
            options={{
              headerTitle: 'Usuários',
              headerRight: () => (
                <Link href={'/(user)/create'} asChild>
                  <TouchableOpacity>
                    <Ionicons name="add" size={32} color="white" />
                  </TouchableOpacity>
                </Link>
              ),

            }}
          />
          
      </Stack>
    </ConvexProvider>
  );
}
