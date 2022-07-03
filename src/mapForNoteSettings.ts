import { App, PluginSettingTab, Setting } from 'obsidian';
import { t } from './translations/helper';
import mapForNotePlugin from './mapForNoteIndex';

export interface MapForNoteSettings {
  useForwardLinks: boolean;
  useBackLinks: boolean;
  useTags: boolean;
  skipMOCs: boolean;
}

export const DEFAULT_SETTINGS: MapForNoteSettings = {
  useForwardLinks: false,
  useBackLinks: true,
  useTags: false,
  skipMOCs: true,
};

export class MapForNoteSettingTab extends PluginSettingTab {
  plugin: mapForNotePlugin;
  //eslint-disable-next-line
  private applyDebounceTimer: number = 0;

  constructor(app: App, plugin: mapForNotePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  applySettingsUpdate() {
    clearTimeout(this.applyDebounceTimer);
    const plugin = this.plugin;
    this.applyDebounceTimer = window.setTimeout(() => {
      plugin.saveSettings();
    }, 100);
  }

  //eslint-disable-next-line
  async hide() {}

  async display() {
    await this.plugin.loadSettings();

    const { containerEl } = this;
    this.containerEl.empty();

    // this.containerEl.createEl('h1', { text: t('Regular Options') });

    // new Setting(containerEl)
    //   .setName('Use Forward-links')
    //   .setDesc(
    //     "If set, allows to travel using forward-links. If you have a graph like this: A -> B -> C and you ask about the story between A and C, it will give you 'A, B, C' since A forward-links to B and B forward-links to C",
    //   )
    //   .addToggle((toggle) =>
    //     toggle.setValue(this.plugin.settings.useForwardLinks).onChange((value) => {
    //       this.plugin.settings.useForwardLinks = value;
    //       this.plugin.saveData(this.plugin.settings);
    //     }),
    //   );
    //
    // new Setting(containerEl)
    //   .setName('Use Back-links')
    //   .setDesc(
    //     "If set, allows to travel using back-links. If you have a graph like this: A -> B -> C and you ask about the story between C and A, it will give you 'C, B, A' since C has a back-link from B and B has a back-link from A",
    //   )
    //   .addToggle((toggle) =>
    //     toggle.setValue(this.plugin.settings.useBackLinks).onChange((value) => {
    //       this.plugin.settings.useBackLinks = value;
    //       this.plugin.saveData(this.plugin.settings);
    //     }),
    //   );
    //
    // containerEl.createEl('h3', { text: 'Include Tags' });
    //
    // new Setting(containerEl)
    //   .setName('Use Tags')
    //   .setDesc('If set, allows to travel using tags. ')
    //   .addToggle((toggle) =>
    //     toggle.setValue(this.plugin.settings.useTags).onChange((value) => {
    //       this.plugin.settings.useTags = value;
    //       this.plugin.saveData(this.plugin.settings);
    //     }),
    //   );
    //
    // containerEl.createEl('h3', { text: 'Avoid traveling via certain notes and folders' });
    //
    // new Setting(containerEl)
    //   .setName('Take the scenic route')
    //   .setDesc(
    //     "If set, will skip 'hub' notes with too many links (MOCs). Configure exactly how many links make a MOC below.",
    //   )
    //   .addToggle((toggle) =>
    //     toggle.setValue(this.plugin.settings.skipMOCs).onChange((value) => {
    //       this.plugin.settings.skipMOCs = value;
    //       this.plugin.saveData(this.plugin.settings);
    //     }),
    //   );

    this.containerEl.createEl('h1', { text: t('Say Thank You') });

    new Setting(containerEl)
      .setName(t('Donate'))
      .setDesc(t('If you like this plugin, consider donating to support continued development:'))
      // .setClass("AT-extra")
      .addButton((bt) => {
        bt.buttonEl.outerHTML = `<a href="https://www.buymeacoffee.com/boninall"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=boninall&button_colour=6495ED&font_colour=ffffff&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00"></a>`;
      });
  }
}
