import {ItemView, WorkspaceLeaf} from "obsidian";

export const IMAGE_MARKUP_VIEW_TYPE = "image-markup-view";

export default class ImageMarkupModal extends ItemView {
	fileName: string;

	constructor(leaf: WorkspaceLeaf, fileName: string) {
		super(leaf);
		this.fileName = fileName;
	}

	getDisplayText(): string {
		return this.fileName;
	}

	getViewType(): string {
		return IMAGE_MARKUP_VIEW_TYPE;
	}
}
