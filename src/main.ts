import {
  App,
  Editor,
  MarkdownView,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  TAbstractFile,
  WorkspaceLeaf
} from 'obsidian';
import ImageMarkupView, {IMAGE_MARKUP_VIEW_TYPE} from "./image-markup-view";
import {DEFAULT_SETTINGS, ImageMarkupPluginSettings, SampleSettingTab} from "./settings";
import {IMAGE_FILE_NAME_REGEX} from "./utils";

// Remember to rename these classes and interfaces!

export default class ImageMarkupPlugin extends Plugin {
  settings: ImageMarkupPluginSettings;
  currentFile: TAbstractFile;

  async onload() {
    await this.loadSettings();

    this.registerView(IMAGE_MARKUP_VIEW_TYPE, this.viewGenerator);

    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (IMAGE_FILE_NAME_REGEX.test(file.name))
          menu.addItem((item) => {
            item
              .setTitle("Go markup")
              .setIcon("image")
              .onClick(async () => {
                this.currentFile = file;
                new Notice(file.path);
                this.showView();
              });
          });
      })
    );

    // This adds a settings tab so the user can configure various aspects of the plugin
    this.addSettingTab(new SampleSettingTab(this.app, this));

    // If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
    // Using this function will automatically remove the event listener when this plugin is disabled.
    this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
      console.log('click', evt);
    });

    // When registering intervals, this function will automatically clear the interval when the plugin is disabled.
    this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
  }

  onunload() {
    this.app.workspace.detachLeavesOfType(IMAGE_MARKUP_VIEW_TYPE);
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  showView = async function () {
    let workspace = this.app.workspace;
    workspace.getLeaf(false).setViewState({type: IMAGE_MARKUP_VIEW_TYPE});
    let leftCollapseButton = workspace.leftRibbon.collapseButtonEl;
    if (leftCollapseButton.ariaLabel === "Collapse") {
      leftCollapseButton.click();
    }
  };

  private viewGenerator(leaf: WorkspaceLeaf) {
    console.log("HI")
    return new ImageMarkupView(leaf, this, this.currentFile);
  }
}
