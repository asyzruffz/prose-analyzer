import * as vscode from 'vscode';
import { parse } from './parser';

export default class ProseDocumentTokensProvider implements vscode.DocumentSemanticTokensProvider {

	async provideDocumentSemanticTokens(document: vscode.TextDocument, _token: vscode.CancellationToken): Promise<vscode.SemanticTokens> {
		const builder = new vscode.SemanticTokensBuilder();
		const allTokens = parse(document.getText());
		allTokens.forEach((token) => {
			builder.push(token.line, token.startCharacter, token.length, token.tokenType, token.tokenModifiers);
		});
		return builder.build();
	}
}
