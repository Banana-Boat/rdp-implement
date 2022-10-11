// token类型枚举
export enum TokenType {
  Number = "Number",
  String = "String",
  Semicolon = ";",
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
  NumericLiteral = "NumericalLiteral",
  StringLiteral = "StringLiteral",
}

// AST普通结点 类型定义
export type ASTNode = {
  type: ASTNodeType;
  value: number | string;
};

// AST表达式结点 类型定义
export type ASTExpressionNode = {
  type: ASTNodeType.ExpressionStatement;
  expression: ASTNode;
};

// AST根结点 类型定义
export type ASTRoot = {
  type: ASTNodeType.Program;
  body: ASTExpressionNode[];
};
