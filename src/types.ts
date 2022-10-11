// token类型枚举
export enum TokenType {
  Number = "Number",
  String = "String",
  Semicolon = ";",
  LeftCurlyBrace = "{",
  RightCurlyBrace = "}",
}

// token类型定义
export type Token = {
  type: TokenType;
  value: number | string;
};

// token匹配规则
export type Specification = [RegExp, TokenType | null];
export type SpecificationList = Specification[];

// ASTNode 类型枚举
export enum ASTNodeType {
  Program = "Program",
  ExpressionStatement = "ExpressionStatement",
  BlockStatement = "BlockStatement",
  EmptyStatement = "EmptyStatement",
  NumericLiteral = "NumericalLiteral",
  StringLiteral = "StringLiteral",
}

// AST普通结点 类型定义
export type ASTNode = {
  type: ASTNodeType;
  value?: number | string;
  expression?: ASTNode; // ExpressionStatement
  body?: ASTNode[]; // BlockStatement | EmptyStatement
};

// AST根结点 类型定义
export type ASTRoot = {
  type: ASTNodeType.Program;
  body: ASTNode[];
};
