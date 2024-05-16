// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { lstatSync } from 'fs';
import * as vscode from 'vscode';
import { FileHandler } from './FileHandler';
import { JpgHandler } from './handlers/jpg';
import { PngHandler } from './handlers/png';
import { SvgHandler } from './handlers/svg';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	const dispose = vscode.workspace.onDidCreateFiles((event: vscode.FileCreateEvent) => {
		vscode.window.showInformationMessage(`Event`);

		const handlers: FileHandler[] = [
			new PngHandler(),
			new JpgHandler(),
			new SvgHandler()
		];

		event.files.map((f) => f.fsPath).filter((f) => lstatSync(f).isFile()).forEach((f: string) => {
			vscode.window.showInformationMessage(`Files ${f}`);
			for (const handler of handlers) {
				if (handler.can_handle(f)) {
					handler.handle(f);
					break;
				}
			}
		});
	});


    // Dispose the watcher when the extension is deactivated
    context.subscriptions.push(dispose);
}

// This method is called when your extension is deactivated
export function deactivate() {

}
