import * as vscode from 'vscode';

const tokenTypes = new Map<string, number>();
const tokenModifiers = new Map<string, number>();

const tokenTypesLegend = ['class', 'interface', 'enum', 'function', 'variable'];

const tokenModifiersLegend = ['declaration', 'documentation'];

const legend = new vscode.SemanticTokensLegend(tokenTypesLegend, tokenModifiersLegend);

export { tokenTypes, tokenModifiers, legend };
