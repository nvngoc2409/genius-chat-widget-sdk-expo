import { requireNativeModule, NativeModule } from 'expo';


import { DGChatModuleEvents } from './DGChatModule.types';

declare class DGChatModule extends NativeModule<DGChatModuleEvents> {
    PI: number;

    showDGChatView(widgetId: string, env: string, customConfigs: object | null, crmPlatform: string | null, crmVersion: string | null): void

    hideDGChatView(): void

    launchWidget(): void

    initProactiveButtons(questions: Array<string>, answers: Array<string>): void

    sendMessage(message: string): void

    sendSystemMessage(payload: object): void

    resetChat(): void
}

// This call loads the native module object from the JSI.
export default requireNativeModule('DGChatModule');