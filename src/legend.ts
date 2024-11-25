import * as vscode from 'vscode';

const tokenTypes = new Map<string, number>();
const tokenModifiers = new Map<string, number>();

const tokenTypesLegend = [
    "namespace", 
    "class", 
    "interface", 
    "enum", 
    "type", 
    "method", 
    "function", 
    "variable", 
    "event",
    "comment",
    "string",
    "number",
    "keyword",
    "operator",
];

const tokenModifiersLegend = [
    "declaration", 
    "definition", 
    "deprecated", 
    "readonly", 
    "documentation", 
    "defaultLibrary"
];

tokenTypesLegend.forEach((tokenType, index) => tokenTypes.set(tokenType, index));
tokenModifiersLegend.forEach((tokenModifier, index) => tokenModifiers.set(tokenModifier, index));

const legend = new vscode.SemanticTokensLegend(tokenTypesLegend, tokenModifiersLegend);

export { tokenTypes, tokenModifiers, legend };
