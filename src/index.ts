import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to DGChatModule.web.ts
// and on native platforms to DGChatModule.ts
import DGChatModule from './DGChatModule';
import DGChatModuleView from './DGChatModuleView';
import { ChangeEventPayload, DGChatModuleViewProps } from './DGChatModule.types';

// Get the native constant value.
export const PI = DGChatModule.PI;

export function hello(): string {
  return DGChatModule.hello();
}

export async function setValueAsync(value: string) {
  return await DGChatModule.setValueAsync(value);
}

const emitter = new EventEmitter(DGChatModule ?? NativeModulesProxy.DGChatModule);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { DGChatModuleView, DGChatModuleViewProps, ChangeEventPayload };
