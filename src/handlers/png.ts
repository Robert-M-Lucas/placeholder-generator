import * as vscode from 'vscode';
import { unlinkSync, writeFileSync } from "fs";
import { encode } from "fast-png";
import { FileHandler } from "../FileHandler";

export class PngHandler extends FileHandler {
	can_handle(path: String): boolean {
		return path.endsWith(".png") || path.endsWith(".PNG");
	}

	handle(path: string): void {
		unlinkSync(path);
		const width = 128;
		const height = 128;
		const channels = 3;

		let data = new Uint8Array(width * height * channels);
		let encoded = encode({
			width: width,
			height: height,
			data: data,
			depth: 8,
			channels: channels
		});
		writeFileSync(path, encoded);
		vscode.window.showInformationMessage(`PNG file created: ${path}`);
	}
}