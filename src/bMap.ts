import { ItemView } from 'obsidian';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { mapViewType } from './utils/consts';

import DiceRoller from './ui/map';

export class MapForNote extends ItemView {
  private mapForNoteComponent: React.ReactElement;

  getViewType(): string {
    return mapViewType;
  }

  getDisplayText(): string {
    return 'Map For Note';
  }

  getIcon(): string {
    return 'map';
  }

  async onOpen(): Promise<void> {
    this.mapForNoteComponent = React.createElement(DiceRoller);

    const root = createRoot((this as any).contentEl!);
    root.render(this.mapForNoteComponent);
  }
}
