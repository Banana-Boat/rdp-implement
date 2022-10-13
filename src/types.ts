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

  RelationalOperator = "< > <= >=",
  EqualityOperator = "== !=",
  LogicalOrOperator = "||",
  LogicalAndOperator = "&&",
  LogicalNotOperator = "!",

  LetKeyword = "let",
  IfKeyword = "if",
  ElseKeyword = "else",
  TrueKeyword = "true",
  FalseKeyword = "false",
  NullKeyword = "null",
  WhileKeyword = "while",
  DoKeyword = "do",
  ForKeyword = "for",
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
  IfStatement = "IfStatement",
  ForStatement = "ForStatement",
  WhileStatement = "WhileStatement",
  DoWhileStatement = "DoWhileStatement",

  VariableStatement = "VariableStatement",
  VariableDeclaration = "VariableDeclaration",

  ExpressionStatement = "ExpressionStatement",
  AssignmentExpression = "AssignmentExpression",
  BinaryExpression = "BinaryExpression",
  LogicalExpression = "LogicalExpression",
  UnaryExpression = "UnaryExpression",

  NumericLiteral = "NumericalLiteral",
  StringLiteral = "StringLiteral",
  BooleanLiteral = "BooleanLiteral",
  NullLiteral = "NullLiteral",
  Identifier = "Identifier",
}

// AST普通结点 类型定义
export type ASTNode = {
  type: ASTNodeType;
  value?: number | string | null;

  expression?: ASTNode; // ExpressionStatement
  body?: ASTNode[] | ASTNode; // BlockStatement | EmptyStatement | ForStatement | WhileStatement | DoWhileStatement

  update?: ASTNode | null; // ForStatement

  test?: ASTNode | null; // IfStatement | ForStatement | WhileStatement | DoWhileStatement
  consequent?: ASTNode; // IfStatement
  alternate?: ASTNode | null; // IfStatement

  declarations?: ASTNode[]; // VariableStatement
  id?: ASTNode; // VariableDeclaration
  init?: ASTNode | null; // VariableDeclaration | ForStatement

  name?: string; // Identifier

  left?: ASTNode; // BinaryExpression | AssignmentExpression | LogicalExpression
  right?: ASTNode; // BinaryExpression | AssignmentExpression | LogicalExpression
  operator?: string; // BinaryExpression | AssignmentExpression | LogicalExpression | UnaryExpression
  argument?: ASTNode; // UnaryExpression
};

// AST根结点 类型定义
export type ASTRoot = {
  type: ASTNodeType.Program;
  body: ASTNode[];
};
