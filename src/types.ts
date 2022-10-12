// token类型枚举
export enum TokenType {
  Number = "Number",
  String = "String",
  Identifier = "Identifier",

  Semicolon = ";",
  Comma = ",",

  LeftCurlyParenthese = "{",
  RightCurlyParenthese = "}",
  LeftParenthese = "(",
  RightParenthese = ")",

  AdditiveOperator = "+ -",
  MultiplicativeOperater = "* /",

  SimpleAssignmentOperator = "=",
  ComplexAssignmentOperator = "+= -= *= /=",

  VariableDeclarationKeyword = "let",
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

  VariableStatement = "VariableStatement",
  VariableDeclaration = "VariableDeclaration",

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
  declarations?: ASTNode[]; // VariableStatement

  id?: ASTNode; // VariableDeclaration
  init?: ASTNode | null; // VariableDeclaration

  left?: ASTNode; // BinaryExpression | AssignmentExpression
  right?: ASTNode; // BinaryExpression | AssignmentExpression
  operator?: string; // BinaryExpression | AssignmentExpression
};

// AST根结点 类型定义
export type ASTRoot = {
  type: ASTNodeType.Program;
  body: ASTNode[];
};
