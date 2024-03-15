import React from 'react';
import { useStorageState } from './useStorageState';
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api';


const AuthContext = React.createContext<{
  signIn: (name:string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  const users = useQuery(api.users.get) || [];

  return (
    <AuthContext.Provider
      value={{
        signIn: (name) => {
          const user = users.find((u) => u.name.toLowerCase() === name.toLowerCase()); 
          let userdata = {...user}; 
          if (userdata) {
            delete userdata.password 
          } else {
            return;
          }
          const json = JSON.stringify(userdata);
          setSession(json);
          return json
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

