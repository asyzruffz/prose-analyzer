import * as vscode from 'vscode';
import ProseDocumentTokensProvider from './ProseDocumentTokensProvider';
import { legend } from './legend';

export function activate(context: vscode.ExtensionContext) {

    const selector = { language: 'prose', scheme: 'file' };

	const disposable = vscode.languages.registerDocumentSemanticTokensProvider(selector, new ProseDocumentTokensProvider(), legend);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
