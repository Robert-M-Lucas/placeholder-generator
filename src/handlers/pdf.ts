import * as vscode from 'vscode';
import { copyFileSync, unlinkSync, writeFileSync } from "fs";
import { FileHandler } from "../FileHandler";

export class PdfHandler extends FileHandler {
	can_handle(path: String): boolean {
		return path.endsWith(".pdf") || path.endsWith(".PDF");
	}

	handle(path: string): void {
		unlinkSync(path);
		copyFileSync(this.get_data_path("sample.pdf"), path);
		vscode.window.showInformationMessage(`PDF file created: ${path}`);
	}
}