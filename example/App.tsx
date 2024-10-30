import { StyleSheet, Text, View } from 'react-native';

import * as DGChatModule from 'genius-chat-expo';

import {useEffect} from 'react';

export default function App() {
  useEffect(() => {
    const onWidgetEmbedded = DGChatModule.addOnWidgetEmbeddedListener(()=>{
      console.log('onWidgetEmbedded')
    });

    return () => onWidgetEmbedded.remove();
  }, []);

  DGChatModule.showDGChatView(
    "f0c07546-af4c-4963-9e23-3e9343eaf13b",
    "dev.us",
    {"generalSettings":{ "isChatLauncherEnabled" : true}, "locale" : "en-US"},
    null,
    null
  );
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
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
