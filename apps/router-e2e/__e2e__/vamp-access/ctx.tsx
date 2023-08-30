import { router } from 'expo-router';
import React from 'react';
import { useStorageState } from './useStorageState';

const AuthContext = React.createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

export function Provider(props) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          setSession('xxx');
          router.replace('/');
        },
        signOut: () => {
          setSession(null);
        },
        user: session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
