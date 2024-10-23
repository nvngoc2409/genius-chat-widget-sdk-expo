import * as React from 'react';

import { DGChatModuleViewProps } from './DGChatModule.types';

export default function DGChatModuleView(props: DGChatModuleViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
