export type ChangeEventPayload = {
  value: string;
};

export type DGChatModuleEvents = {
  onChatLauncherClick(): void;
  onChatMinimizeClick(): void;
  onCSATPopoverCloseClicked(): void;
  onChatProactiveButtonClick(): void;
  onWidgetEmbedded(): void;
  newConversationStarted(): void;
  onChatInitialised(): void;
  onChatInitialisedError(): void;
  onChatEndClick(): void;
};