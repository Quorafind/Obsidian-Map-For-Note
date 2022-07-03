import { ItemView, Scope, WorkspaceLeaf } from 'obsidian';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { mapViewType } from './utils/consts';

import NoteMap from './ui/mfnMap';
import type mapForNotePlugin from './mapForNoteIndex';

declare module 'obsidian' {
  interface App {
    isMobile(): boolean;
  }

  interface Workspace {
    on(name: 'hover-link', callback: (e: MouseEvent) => any, ctx?: any): EventRef;
  }
}

export class MapForNote extends ItemView {
  private mapForNoteComponent: React.ReactElement;
  scope: Scope = new Scope(this.app.scope);
  plugin: mapForNotePlugin;

  constructor(leaf: WorkspaceLeaf, plugin: mapForNotePlugin) {
    super(leaf);
    this.plugin = plugin;
  }

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
    useForwardLinks = this.plugin.settings.useForwardLinks;
    useBackLinks = this.plugin.settings.useBackLinks;
    useTags = this.plugin.settings.useTags;
    skipMOCs = this.plugin.settings.skipMOCs;

    // this.scope.register(['Mod'], 'Enter', () => {
    //   return true;
    // });

    this.mapForNoteComponent = React.createElement(NoteMap);
    const root = createRoot((this as any).contentEl!);
    root.render(this.mapForNoteComponent);
  }
}

export let useForwardLinks: boolean;
export let useBackLinks: boolean;
export let useTags: boolean;
export let skipMOCs: boolean;
