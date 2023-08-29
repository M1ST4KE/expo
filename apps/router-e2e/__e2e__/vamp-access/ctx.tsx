import { router, useSegments } from 'expo-router';
import React, { useEffect } from 'react';

const AuthContext = React.createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const segments = useSegments();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('/sign-in');
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('/');
    }
  }, [user, segments]);
}

export function Provider(props) {
  const [isLoading, setLoading] = React.useState(true);

  const [user, setAuth] = React.useState(null);

  useEffect(() => {
    getAsync('user').then((user) => {
      setLoading(false);
      setAuth(user);
    });
  }, []);
  //   useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          setAuth({});
          setAsync('user', '{}');
          router.replace('/');
        },
        signOut: () => {
          setAsync('user', null);
          setAuth(null);
        },
        user,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

function getAsync(key: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (typeof localStorage !== 'undefined') {
        resolve(localStorage.getItem(key));
      } else {
        // noop
      }
    }, 1000);
  });
}

function setAsync(key: string, value: string) {
  return new Promise((resolve) => {
    if (typeof localStorage !== 'undefined') {
      if (value == null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } else {
      // noop
    }
    resolve();
  });
}
