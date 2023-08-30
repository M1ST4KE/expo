import { Link, Redirect, Stack } from 'expo-router';
import { Text, View } from 'react-native';

import { useAuth } from '../../ctx';

export default function Root() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Only do authorization on the (app) group as users should always be able to access the (auth) group and sign-in again.
  if (!user) {
    // Either redirect directly to the sign-in page, or show the user a route protection page.
    // On web, static rendering will stop here as the user is not authenticated in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
    return (
      <View>
        <Text>Unauthorized</Text>
        <Link href={'/sign-in'}>Sign In</Link>
      </View>
    );
  }

  return <Stack />;
}
