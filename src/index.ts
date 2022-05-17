import { Plugin, WorkspaceLeaf } from 'obsidian';
import { mapViewType } from './utils/consts';
import { MapForNote } from './bMap';

export default class mapForNotePlugin extends Plugin {
  private view: MapForNote;

  async onload(): Promise<void> {
    this.registerView(mapViewType, (leaf: WorkspaceLeaf) => (this.view = new MapForNote(leaf)));

    this.app.workspace.onLayoutReady(this.onLayoutReady.bind(this));
  }

  onLayoutReady(): void {
    if (this.app.workspace.getLeavesOfType(mapViewType).length) {
      return;
    }
    this.app.workspace.getRightLeaf(false).setViewState({
      type: mapViewType,
    });
  }
}
