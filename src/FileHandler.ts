import * as vscode from 'vscode';

export class FileHandler {
	extension_path: string;
	constructor(context: vscode.ExtensionContext) {
		this.extension_path = context.extensionPath;
	}

	get_data_path(realtive_path: string): string {
		return this.extension_path + "/data/" + realtive_path;
	}

	can_handle(path: string): boolean { return false; }
	handle(path: string) {}
}