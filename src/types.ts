// token类型枚举
export enum TokenType {
  Number = "Number",
  String = "String",
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
  NumericLiteral = "NumericalLiteral",
  StringLiteral = "StringLiteral",
}

// ASTNode 类型定义
export type ASTNode = {
  type: ASTNodeType;
  value: ASTNode | number | string;
};

// AST 类型定义
export type AST = {
  type: ASTNodeType.Program;
  body: ASTNode;
};
