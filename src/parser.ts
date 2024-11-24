
interface IParsedToken {
	line: number;
	startCharacter: number;
	length: number;
	tokenType: string;
	tokenModifiers: string[];
}

export function parse(text: string): IParsedToken[] {
    const tokens: IParsedToken[] = [];
    const lines = text.split(/\r\n|\r|\n/);
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let currentOffset = 0;
        do {
            const openOffset = currentOffset;
            if (openOffset >= line.length) {
                break;
            }

            const token = scanToken(line.substring(currentOffset));
            const tokenInfo = identifyToken(token);

            tokens.push({
                line: i,
                startCharacter: openOffset + 1,
                length: token.length,
                tokenType: tokenInfo.type,
                tokenModifiers: tokenInfo.modifiers
            });

            currentOffset += token.length;
        } while (true);
    }
    return tokens;
}

function scanToken(text: string): string {
    let start = 0;
    let end = 0;
    while (end < text.length && text[end] !== ' ' && text[end] !== '\t' && text[end] !== '\r' && text[end] !== '\n') {
        // Start comments with '!'
        if (text[end] === '!') {
            end = text.length;
            break;
        }
        end++;
    }
    return text.substring(start, end);
}

function identifyToken(text: string): { type: string; modifiers: string[]; } {
    const parts = text.split('.');
    return {
        type: parts[0],
        modifiers: parts.slice(1)
    };
}
