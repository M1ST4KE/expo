import { Text, View } from 'react-native';

import { useAuth } from '../../ctx';

export default function Index() {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text onPress={() => signOut()}>Sign Out</Text>
    </View>
  );
}
