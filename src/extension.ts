import * as vscode from 'vscode';

async function executeCommand(name: string): Promise<void> {
	const success = await vscode.commands.executeCommand(name);
	// if (!success) {throw new Error(`Command "${name}" failed`);}
}

const COMMANDS = [
	async function betterPageUp() {
		await executeCommand('scrollPageUp');
		await executeCommand('cursorPageUp');
	},
	async function betterPageUpSelect() {
		await executeCommand('scrollPageUp');
		await executeCommand('cursorPageUpSelect');
	},
	async function betterPageDown() {
		await executeCommand('scrollPageDown');
		await executeCommand('cursorPageDown');
	},
	async function betterPageDownSelect() {
		await executeCommand('scrollPageDown');
		await executeCommand('cursorPageDownSelect');
	},
] as const;


export function activate(context: vscode.ExtensionContext) {
	for (const cmd of COMMANDS) {
		let disposable = vscode.commands.registerCommand(cmd.name, cmd);
		context.subscriptions.push(disposable);
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}
