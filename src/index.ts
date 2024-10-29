import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to DGChatModule.web.ts
// and on native platforms to DGChatModule.ts
import DGChatModule from './DGChatModule';
import { ChangeEventPayload } from './DGChatModule.types';

// Get the native constant value.
export const PI = DGChatModule.PI;

export function showDGChatView(widgetId: string, env: string, customConfigs:object|null , crmPlatform: string|null, crmVersion: string|null) {
  return DGChatModule.showDGChatView(widgetId, env, customConfigs, crmPlatform, crmVersion);
}

export function hideDGChatView() {
  return DGChatModule.hideDGChatView();
}

export function launchWidget() {
  return DGChatModule.launchWidget();
}

export function initProactiveButtons(questions: Array<string>, answers: Array<string>) {
  return DGChatModule.initProactiveButtons(questions, answers);
}

export function sendMessage(message:string) {
  return DGChatModule.sendMessage(message);
}

export function sendSystemMessage(payload:object) {
  return DGChatModule.sendSystemMessage(payload);
}

export function resetChat() {
  return DGChatModule.resetChat();
}

const emitter = new EventEmitter(DGChatModule ?? NativeModulesProxy.DGChatModule);

export function addOnChatMinimizeClickListener(listener: () => void): Subscription {
  return emitter.addListener('onChatMinimizeClick', listener);
}
export function addOnChatEndClickListener(listener: () => void): Subscription {
  return emitter.addListener('onChatEndClick', listener);
}
export function addOnChatProactiveButtonClickListener(listener: () => void): Subscription {
  return emitter.addListener('onChatProactiveButtonClick', listener);
}
export function addOnCSATPopoverCloseClickedListener(listener: () => void): Subscription {
  return emitter.addListener('onCSATPopoverCloseClicked', listener);
}
export function addOnWidgetEmbeddedListener(listener: () => void): Subscription {
  return emitter.addListener('onWidgetEmbedded', listener);
}
export function addNewConversationStartedListener(listener: () => void): Subscription {
  return emitter.addListener('newConversationStarted', listener);
}
export function addOnChatInitialisedListener(listener: () => void): Subscription {
  return emitter.addListener('onChatInitialised', listener);
}
export function addOnChatInitialisedErrorListener(listener: () => void): Subscription {
  return emitter.addListener('onChatInitialisedError', listener);
}

export { ChangeEventPayload };
