import Tokenizer from "./Tokenizer";
import { Token, TokenType, ASTNodeType, ASTRoot, ASTNode } from "./types";

class Parser {
  _string: string;
  _tokenizer: Tokenizer;
  _lookahead: Token | null;

  constructor() {
    this._string = "";
    this._tokenizer = new Tokenizer();
    this._lookahead = null;
  }

  parse(string: string) {
    this._string = string;
    this._tokenizer.init(string);
    this._lookahead = this._tokenizer.getNextToken();

    return this.Program();
  }

  Program(): ASTRoot {
    return {
      type: ASTNodeType.Program,
      body: this.StatementList(),
    };
  }

  StatementList(stopLookahead: TokenType | null = null): ASTNode[] {
    const statementList = [this.Statement()];
    while (this._lookahead !== null && this._lookahead.type !== stopLookahead) {
      statementList.push(this.Statement());
    }
    return statementList;
  }

  Statement(): ASTNode {
    switch (this._lookahead?.type) {
      case TokenType.Semicolon:
        return this.EmptyStatement();
      case TokenType.LeftCurlyParenthese:
        return this.BlockStatement();
      case TokenType.VariableDeclarationKeyword:
        return this.VariableStatement();
      default:
        return this.ExpressionStatement();
    }
  }

  EmptyStatement(): ASTNode {
    this._eat(TokenType.Semicolon);
    return {
      type: ASTNodeType.EmptyStatement,
      body: [],
    };
  }

  BlockStatement(): ASTNode {
    this._eat(TokenType.LeftCurlyParenthese);
    const body =
      this._lookahead?.type !== TokenType.RightCurlyParenthese
        ? this.StatementList(TokenType.RightCurlyParenthese)
        : [];
    this._eat(TokenType.RightCurlyParenthese);

    return {
      type: ASTNodeType.BlockStatement,
      body,
    };
  }

  VariableStatement(): ASTNode {
    this._eat(TokenType.VariableDeclarationKeyword);
    const declarations = this.VariableDeclarationList();
    this._eat(TokenType.Semicolon);

    return {
      type: ASTNodeType.VariableStatement,
      declarations,
    };
  }

  VariableDeclarationList(): ASTNode[] {
    const declaraitons: ASTNode[] = [];
    do {
      declaraitons.push(this.VariableDeclaration());
    } while (
      this._lookahead?.type === TokenType.Comma &&
      this._eat(TokenType.Comma)
    );
    return declaraitons;
  }

  VariableDeclaration(): ASTNode {
    const id = this.Identifier();
    const init =
      this._lookahead?.type !== TokenType.Comma &&
      this._lookahead?.type !== TokenType.Semicolon
        ? this.VariableInitializer()
        : null;

    return {
      type: ASTNodeType.VariableDeclaration,
      id,
      init,
    };
  }

  VariableInitializer(): ASTNode {
    this._eat(TokenType.SimpleAssignmentOperator);
    return this.AssignmentExpression();
  }

  ExpressionStatement(): ASTNode {
    const expression = this.Expression();
    this._eat(TokenType.Semicolon);
    return {
      type: ASTNodeType.ExpressionStatement,
      expression,
    };
  }

  Expression(): ASTNode {
    return this.AssignmentExpression();
  }

  AssignmentExpression(): ASTNode {
    const left = this.AdditiveExpression();
    if (this._isAssignmentOperator(this._lookahead?.type as TokenType))
      return {
        type: ASTNodeType.AssignmentExpression,
        operator: this.AssignmentOperator().value as string,
        left: this._checkIdentifier(left),
        right: this.AssignmentExpression(),
      };

    return left;
  }

  _isAssignmentOperator(tokenType: TokenType) {
    return (
      tokenType === TokenType.SimpleAssignmentOperator ||
      tokenType === TokenType.ComplexAssignmentOperator
    );
  }

  AssignmentOperator(): Token {
    if (this._lookahead?.type === TokenType.SimpleAssignmentOperator)
      return this._eat(TokenType.SimpleAssignmentOperator);
    else return this._eat(TokenType.ComplexAssignmentOperator);
  }

  // AdditiveExpression ｜ MultiplicativeExpression 复用的逻辑
  _BinaryExpression(
    expressProduction: () => ASTNode,
    operatorToken: TokenType.AdditiveOperator | TokenType.MultiplicativeOperater
  ): ASTNode {
    let left = expressProduction.apply(this);
    while (this._lookahead?.type === operatorToken) {
      const operator = this._eat(operatorToken).value as string;
      const right = expressProduction.apply(this);
      left = {
        type: ASTNodeType.BinaryExpression,
        operator,
        left,
        right,
      };
    }
    return left;
  }

  AdditiveExpression(): ASTNode {
    return this._BinaryExpression(
      this.MultiplicativeExpression,
      TokenType.AdditiveOperator
    );
  }

  MultiplicativeExpression(): ASTNode {
    return this._BinaryExpression(
      this.PrimaryExpression,
      TokenType.MultiplicativeOperater
    );
  }

  PrimaryExpression(): ASTNode {
    if (this._isLiteral(this._lookahead?.type as TokenType))
      return this.Literal();

    switch (this._lookahead?.type) {
      case TokenType.LeftParenthese:
        return this.ParethesizedExpression();
      default:
        return this.Identifier();
    }
  }

  ParethesizedExpression(): ASTNode {
    this._eat(TokenType.LeftParenthese);
    const expression = this.Expression();
    this._eat(TokenType.RightParenthese);
    return expression;
  }

  _checkIdentifier(node: ASTNode): ASTNode {
    if (node.type !== ASTNodeType.Identifier)
      throw new SyntaxError(`Invalid identifier: ${node.value}`);

    return node;
  }

  Identifier(): ASTNode {
    const token = this._eat(TokenType.Identifier);
    return {
      type: ASTNodeType.Identifier,
      value: token.value,
    };
  }

  _isLiteral(tokenType: TokenType) {
    return tokenType === TokenType.Number || tokenType === TokenType.String;
  }

  Literal(): ASTNode {
    switch (this._lookahead?.type) {
      case TokenType.Number:
        return this.NumericLiteral();
      case TokenType.String:
        return this.StringLiteral();
      default:
        throw new SyntaxError("Literal: unexpected literal production");
    }
  }

  NumericLiteral(): ASTNode {
    const token = this._eat(TokenType.Number);
    return {
      type: ASTNodeType.NumericLiteral,
      value: Number(token.value),
    };
  }

  StringLiteral(): ASTNode {
    const token = this._eat(TokenType.String);
    return {
      type: ASTNodeType.StringLiteral,
      value: (token.value as string).slice(1, -1),
    };
  }

  _eat(tokenType: TokenType) {
    const token = this._lookahead;

    if (!token)
      throw new SyntaxError(`Unexpected end of input, expected: ${tokenType}`);

    if (tokenType !== token.type)
      throw new SyntaxError(
        `Unexpected token: ${token.value}, expected: ${tokenType}`
      );

    this._lookahead = this._tokenizer.getNextToken();
    return token;
  }
}

export default Parser;
