import * as vscode from 'vscode';
import { unlinkSync, writeFileSync } from "fs";
import { FileHandler } from "../FileHandler";
import { encode } from "jpeg-js";

export class JpgHandler extends FileHandler {
	can_handle(path: String): boolean {
		return path.endsWith(".jpg") || path.endsWith(".JPG") || path.endsWith(".jpeg") || path.endsWith(".JPEG");
	}

	handle(path: string): void {
		unlinkSync(path);
		const width = 128;
		const height = 128;

		const frameData = new Buffer(width * height * 4);
        const rawImageData = {
            data: frameData,
            width: width,
            height: height,
        };
		const encoded = encode(rawImageData);
		writeFileSync(path, encoded.data);
		vscode.window.showInformationMessage(`JPG file created: ${path}`);
	}
}