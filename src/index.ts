// Reexport the native module. On web, it will be resolved to DGChatModule.web.ts


// and on native platforms to DGChatModule.ts
export { default } from './DGChatModule';
export * from './DGChatModule.types';

import DGChatModule from './DGChatModule';

export function showDGChatView(widgetId: string, env: string, customConfigs: object | null, crmPlatform: string | null, crmVersion: string | null) {
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

export function sendMessage(message: string) {
    return DGChatModule.sendMessage(message);
}

export function sendSystemMessage(payload: object) {
    return DGChatModule.sendSystemMessage(payload);
}

export function resetChat() {
    return DGChatModule.resetChat();
}

export function addOnChatMinimizeClickListener(listener: () => void) {
    return DGChatModule.addListener('onChatMinimizeClick', listener);
}
export function addOnChatEndClickListener(listener: () => void) {
    return DGChatModule.addListener('onChatEndClick', listener);
}
export function addOnChatProactiveButtonClickListener(listener: () => void) {
    return DGChatModule.addListener('onChatProactiveButtonClick', listener);
}
export function addOnCSATPopoverCloseClickedListener(listener: () => void) {
    return DGChatModule.addListener('onCSATPopoverCloseClicked', listener);
}
export function addOnWidgetEmbeddedListener(listener: () => void) {
    return DGChatModule.addListener('onWidgetEmbedded', listener);
}
export function addNewConversationStartedListener(listener: () => void) {
    return DGChatModule.addListener('newConversationStarted', listener);
}
export function addOnChatInitialisedListener(listener: () => void) {
    return DGChatModule.addListener('onChatInitialised', listener);
}
export function addOnChatInitialisedErrorListener(listener: () => void) {
    return DGChatModule.addListener('onChatInitialisedError', listener);
}