import { Link, Redirect, Slot, Stack } from 'expo-router';

import { useAuth } from '../../ctx';
import { View, Text } from 'react-native';

export default function Root() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // return <Redirect href={'/sign-in'} />;
    return (
      <View>
        <Text>Unauthorized</Text>
        <Link href={'/sign-in'}>Sign In</Link>
      </View>
    );
  }

  return <Stack />;
}
