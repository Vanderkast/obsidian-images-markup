import {ItemView, Plugin, TAbstractFile, WorkspaceLeaf} from "obsidian";
import ImageMarkupPlugin from "./main";

export const IMAGE_MARKUP_VIEW_TYPE = "image-markup-view";

export default class ImageMarkupView extends ItemView {
	private plugin: ImageMarkupPlugin;
  private file: TAbstractFile;

	constructor(leaf: WorkspaceLeaf, plugin: ImageMarkupPlugin, file: TAbstractFile) {
		super(leaf);
		this.plugin = plugin;
    this.file = file;
	}

	getDisplayText(): string {
		return this.file.name;
	}

	getViewType(): string {
		return IMAGE_MARKUP_VIEW_TYPE;
	}
}
