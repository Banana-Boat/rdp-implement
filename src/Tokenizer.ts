import { SpecificationList, Token, TokenType } from "./types";

// token正则匹配列表（具有顺序！）
const SpecList: SpecificationList = [
  [/^\s/, null], // 空格
  [/^\/\/.*/, null], // 单行注释
  [/^\/\*[\s\S]*?\*\//, null], // 多行注释

  [/^;/, TokenType.Semicolon], // 分号
  [/^,/, TokenType.Comma], // 逗号
  [/^\./, TokenType.Dot], // 点号
  [/^{/, TokenType.LeftCurlyBracket], // 花括号
  [/^}/, TokenType.RightCurlyBracket],
  [/^\[/, TokenType.LeftBracket], // 中括号
  [/^\]/, TokenType.RightBracket],
  [/^\(/, TokenType.LeftParenthese], // 小括号
  [/^\)/, TokenType.RightParenthese],

  [/^[\+\-]/, TokenType.AdditiveOperator], // 加减符
  [/^[\*\/]/, TokenType.MultiplicativeOperater], // 乘除符

  [/^[<>]=?/, TokenType.RelationalOperator], // 不等关系符
  [/^[!=]=/, TokenType.EqualityOperator], // 相等关系符
  [/^&{2}/, TokenType.LogicalAndOperator], // 逻辑与关系符
  [/^\|{2}/, TokenType.LogicalOrOperator], // 逻辑与关系符
  [/^!/, TokenType.LogicalNotOperator], // 逻辑非关系符

  [/^=/, TokenType.SimpleAssignmentOperator], // 赋值符
  [/^[\+\-\*\/]=/, TokenType.ComplexAssignmentOperator],

  [/^\blet\b/, TokenType.LetKeyword], // 关键字 let
  [/^\bif\b/, TokenType.IfKeyword], // 关键字 if
  [/^\belse\b/, TokenType.ElseKeyword], // 关键字 else
  [/^\btrue\b/, TokenType.TrueKeyword], // 关键字 true,
  [/^\bfalse\b/, TokenType.FalseKeyword], // 关键字 false
  [/^\bnull\b/, TokenType.NullKeyword], // 关键字 null
  [/^\bwhile\b/, TokenType.WhileKeyword], // 关键字 while
  [/^\bdo\b/, TokenType.DoKeyword], // 关键字 do
  [/^\bfor\b/, TokenType.ForKeyword], // 关键字 for
  [/^\bfunction\b/, TokenType.FunctionKeyword], // 关键字 function
  [/^\breturn\b/, TokenType.ReturnKeyword], // 关键字 return
  [/^\bclass\b/, TokenType.ClassKeyword], // 关键字 class
  [/^\bextends\b/, TokenType.ExtendsKeyword], // 关键字 extends
  [/^\bsuper\b/, TokenType.SuperKeyword], // 关键字 super
  [/^\bthis\b/, TokenType.ThisKeyword], // 关键字 this
  [/^\bnew\b/, TokenType.NewKeyword], // 关键字 new

  [/^\d+/, TokenType.Number], // 数字字面量，必须在标识符前！

  [/^\w+/, TokenType.Identifier], // 标识符

  [/^"[^"]*"/, TokenType.String], // 字符串字面量
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
