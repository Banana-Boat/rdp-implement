import { SpecificationList, Token, TokenType } from "./types";

// token正则匹配列表（具有顺序！）
const SpecList: SpecificationList = [
  [/^\s/, null], // 空格
  [/^\/\/.*/, null], // 单行注释
  [/^\/\*[\s\S]*?\*\//, null], // 多行注释

  [/^;/, TokenType.Semicolon], // 分号

  [/^\d+/, TokenType.Number],
  [/^"[^"]*"/, TokenType.String],
  [/^'[^']*'/, TokenType.String],
];

class Tokenizer {
  _string: string;
  _cursor: number;

  constructor() {
    this._cursor = 0;
    this._string = "";
  }

  init(string: string) {
    this._string = string;
    this._cursor = 0;
  }

  hasMoreTokens() {
    return this._string.length > this._cursor;
  }

  getNextToken(): Token | null {
    if (!this.hasMoreTokens()) return null;

    const str = this._string.slice(this._cursor);

    for (let [tokenSpec, tokenType] of SpecList) {
      const tokenValue = this._match(tokenSpec, str);
      if (!tokenValue) continue;

      // 如果匹配到空格或注释
      if (!tokenType) return this.getNextToken();

      return {
        type: tokenType,
        value: tokenValue,
      };
    }
    throw new SyntaxError(`Unexpected token: ${str[0]}`);
  }

  _match(tokenSpec: RegExp, str: string) {
    const matched = tokenSpec.exec(str);
    if (!matched) return null;

    this._cursor += matched[0].length;
    return matched[0];
  }
}

export default Tokenizer;
