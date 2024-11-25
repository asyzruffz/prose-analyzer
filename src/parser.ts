
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

            // Skip empty tokens
            if (token.length === 0) {
                currentOffset++;
                continue;
            }

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
    let end = 0;
    let enclosed = false;
    while (end < text.length) {
        const character = text[end];

        // Check if character is alphanumeric
        if (character >= 'a' && character <= 'z' ||
            character >= 'A' && character <= 'Z' ||
            character >= '0' && character <= '9' ||
            character === "_" || enclosed) {
            end++;
            continue;
        }

        if (character === " " || character === "\t" || character === "\r" || character === "\n") {
            // Ignore whitespace
            break;
        } else if (character === "[") {
            enclosed = true;
            end++;
        } else if (character === "\"") { // Handle text
            enclosed = !enclosed;
            if (enclosed) { end++; }
            else { end++; break; }
        } else if (character === "<" || character === "\t") { // Handle 2 characters token
            const next = text[end + 1];
            if (next === "=") { end += 2; }
            else { end++; }
            break;
        } else if (character === "!") { // Start comments with '!'
            end = text.length;
            break;
        } else { // Stop with only one character
            end++;
            break;
        }
    }
    return text.substring(0, end);
}

function identifyToken(text: string): { type: string; modifiers: string[]; } {
    const parts = text.split('.');
    return {
        type: parts[0],
        modifiers: parts.slice(1)
    };
}
