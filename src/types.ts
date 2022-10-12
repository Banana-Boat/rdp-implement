// token类型枚举
export enum TokenType {
  Number = "Number",
  String = "String",
  Semicolon = ";",
  LeftCurlyParenthese = "{",
  RightCurlyParenthese = "}",
  LeftParenthese = "(",
  RightParenthese = ")",
  AdditiveOperator = "AdditiveOperator",
  MultiplicativeOperater = "MultiplicativeOperater",
  SimpleAssignmentOperator = "SimpleAssignmentOperator",
  ComplexAssignmentOperator = "ComplexAssignmentOperator",
  Identifier = "Identifier",
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
  BlockStatement = "BlockStatement",
  EmptyStatement = "EmptyStatement",
  ExpressionStatement = "ExpressionStatement",
  AssignmentExpression = "AssignmentExpression",
  BinaryExpression = "BinaryExpression",
  NumericLiteral = "NumericalLiteral",
  StringLiteral = "StringLiteral",
  Identifier = "Identifier",
}

// AST普通结点 类型定义
export type ASTNode = {
  type: ASTNodeType;
  value?: number | string;
  expression?: ASTNode; // ExpressionStatement
  body?: ASTNode[]; // BlockStatement | EmptyStatement
  left?: ASTNode; // BinaryExpression | AssignmentExpression
  right?: ASTNode; // BinaryExpression | AssignmentExpression
  operator?: string; // BinaryExpression | AssignmentExpression
};

// AST根结点 类型定义
export type ASTRoot = {
  type: ASTNodeType.Program;
  body: ASTNode[];
};
