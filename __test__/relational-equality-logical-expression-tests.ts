import { ASTNodeType } from "../src/types";
import { TestFunc } from "./types";

export const relationalEqualityLogicalExpressionTests = (
  testFunc: TestFunc
) => {
  testFunc(`x = y < 2;`, {
    type: ASTNodeType.Program,
    body: [
      {
        type: ASTNodeType.ExpressionStatement,
        expression: {
          type: ASTNodeType.AssignmentExpression,
          operator: "=",
          left: {
            type: ASTNodeType.Identifier,
            name: "x",
          },
          right: {
            type: ASTNodeType.BinaryExpression,
            operator: "<",
            left: {
              type: ASTNodeType.Identifier,
              name: "y",
            },
            right: {
              type: ASTNodeType.NumericLiteral,
              value: 2,
            },
          },
        },
      },
    ],
  });

  testFunc(`true == y < 2;`, {
    type: ASTNodeType.Program,
    body: [
      {
        type: ASTNodeType.ExpressionStatement,
        expression: {
          type: ASTNodeType.BinaryExpression,
          operator: "==",
          left: {
            type: ASTNodeType.BooleanLiteral,
            value: "true",
          },
          right: {
            type: ASTNodeType.BinaryExpression,
            operator: "<",
            left: {
              type: ASTNodeType.Identifier,
              name: "y",
            },
            right: {
              type: ASTNodeType.NumericLiteral,
              value: 2,
            },
          },
        },
      },
    ],
  });

  testFunc(`false && x > 1 || true;`, {
    type: ASTNodeType.Program,
    body: [
      {
        type: ASTNodeType.ExpressionStatement,
        expression: {
          type: ASTNodeType.LogicalExpression,
          operator: "||",
          left: {
            type: ASTNodeType.LogicalExpression,
            operator: "&&",
            left: {
              type: ASTNodeType.BooleanLiteral,
              value: "false",
            },
            right: {
              type: ASTNodeType.BinaryExpression,
              operator: ">",
              left: {
                type: ASTNodeType.Identifier,
                name: "x",
              },
              right: {
                type: ASTNodeType.NumericLiteral,
                value: 1,
              },
            },
          },
          right: {
            type: ASTNodeType.BooleanLiteral,
            value: "true",
          },
        },
      },
    ],
  });

  console.log("Relational Equality Logical Expression tests passed");
};
