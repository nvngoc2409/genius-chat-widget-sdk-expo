import { registerWebModule, NativeModule } from 'expo';

import { DGChatModuleEvents } from './DGChatModule.types';

class DGChatModule extends NativeModule<DGChatModuleEvents> {
  PI = Math.PI;

  showDGChatView(widgetId: string, env: string, customConfigs: object | null, crmPlatform: string | null, crmVersion: string | null) {
    return
  }

  hideDGChatView() {
  }

  launchWidget() {
  }

  initProactiveButtons(questions: Array<string>, answers: Array<string>) {
  }

  sendMessage(message: string) {
  }

  sendSystemMessage(payload: object) {
  }

  resetChat() {
  }
}

export default registerWebModule(DGChatModule);
