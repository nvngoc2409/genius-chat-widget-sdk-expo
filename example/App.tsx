import { StyleSheet, Text, View } from 'react-native';

import * as DGChatModule from 'genius-chat-expo';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{DGChatModule.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
