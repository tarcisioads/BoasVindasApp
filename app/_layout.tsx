import { Stack } from 'expo-router'; 
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayoutNav() {

  return (
    <ConvexProvider client={convex}>
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: '#EEA217',
        },
        headerTintColor: '#fff',
      }}>
        <Stack.Screen 
          name="index"
          options={{
            headerTitle: 'Visitantes',
            headerRight: () => (
              <Link href={'/(modal)/create'} asChild>
                <TouchableOpacity>
                  <Ionicons name="add" size={32} color="white" />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />
        <Stack.Screen name="(persons)/[personid]" options={{ headerTitle: 'Test'}} />
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
      </Stack>
    </ConvexProvider>
  );
}
