import { Slot } from 'expo-router';
import { SessionProvider } from './ctx';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

export default function Root() {

  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
    unsavedChangesWarning: false,
  });


  // Set up the auth context and render our layout inside of it.
  return (
    <ConvexProvider client={convex}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </ConvexProvider>
  );
}
