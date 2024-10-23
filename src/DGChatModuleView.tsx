import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { DGChatModuleViewProps } from './DGChatModule.types';

const NativeView: React.ComponentType<DGChatModuleViewProps> =
  requireNativeViewManager('DGChatModule');

export default function DGChatModuleView(props: DGChatModuleViewProps) {
  return <NativeView {...props} />;
}
