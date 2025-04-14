import { StyleSheet, Text, Button, View } from 'react-native';

import * as DGChatModule from 'genius-chat-expo';

import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const onWidgetEmbedded = DGChatModule.addOnWidgetEmbeddedListener(() => {
      console.log('onWidgetEmbedded')
    });
  }, []);

  const widgetConfigs = {
    "widgetPosition": {
      "mobile": {
        "launcher": {
          "bottom": "10px",
          "right": "10px"
        },
        "proactive": {
          "bottom": "10px",
          "right": "10px"
        },
        "dialog": {
          "top": "0px",
          "right": "0px",
          "bottom": "10px",
          "left": "0px"
        }
      }
    },
    "generalSettings": {
      "isChatLauncherEnabled": true
    },
    "prechatForm": {
      "welcomeMessage": "Hello user",
      "suffixMessage": "Just to let you understand",
      "isEnabled": false
    },
    "proactiveButtonsSettings": {
      "answers": [
        "Chat to a Stylist",
        "Learn about our promotions",
        "Help with an existing order"
      ],
      "isEnabled": true,
      "questions": [
        "Buy 2 Get 1 20% off! Chat to a Stylist for personal product recommendations."
      ]
    }
  };

  const onSendMessage = () => {
    DGChatModule.sendMessage("this is test message");
  };

  const onSendSystemMessage = () => {
    let payload = {
      "name": "auth_token",
      "payload": "123"
    }
    DGChatModule.sendSystemMessage(payload);
  };

  const resetChat = () => {
    DGChatModule.resetChat()
  };

  DGChatModule.showDGChatView(
    "f0c07546-af4c-4963-9e23-3e9343eaf13b",
    "dev.us",
    widgetConfigs,
    null,
    null
  );
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <Button title="Send Message" onPress={onSendMessage} />
      <Button title="Send System Message" onPress={onSendSystemMessage} />
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
