import { FileView, Notice, Platform, Plugin, WorkspaceLeaf } from 'obsidian';
import { mapViewType } from './utils/consts';
import { MapForNote } from './mapForNoteComponent';
import { t } from './translations/helper';
import { DEFAULT_SETTINGS, MapForNoteSettings, MapForNoteSettingTab } from './mapForNoteSettings';

export default class mapForNotePlugin extends Plugin {
  private view: MapForNote;
  public settings: MapForNoteSettings;

  async onload(): Promise<void> {
    await this.loadSettings();
    this.registerView(mapViewType, (leaf: WorkspaceLeaf) => (this.view = new MapForNote(leaf, this)));

    this.addSettingTab(new MapForNoteSettingTab(this.app, this));
    // this.app.workspace.onLayoutReady(this.onLayoutReady.bind(this));
    this.addRibbonIcon('map', 'Map For Note', () => {
      new Notice(t('Open Map For Note Successfully'));
      this.openMapView();
    });

    this.addCommand({
      id: 'open-map-for-note',
      name: 'Open Map For Note',
      callback: () => this.openMapView(),
      hotkeys: [],
    });
  }

  public async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  onunload() {
    this.app.workspace.detachLeavesOfType(mapViewType);
    new Notice(t('Close Map For Note Successfully'));
  }

  onLayoutReady(): void {
    this.addSettingTab(new MapForNoteSettingTab(this.app, this));
  }

  async openMapView() {
    const workspace = this.app.workspace;
    workspace.detachLeavesOfType(mapViewType);
    const leaf = workspace.getLeaf(
      !Platform.isMobile && workspace.activeLeaf && workspace.activeLeaf.view instanceof FileView,
    );
    await leaf.setViewState({ type: mapViewType });
    workspace.revealLeaf(leaf);
  }
}
