import { ASTNodeType } from "../src/types";
import { TestFunc } from "./types";

export const mathTests = (testFunc: TestFunc) => {
  testFunc(`3 + 2 - 1;`, {
    type: ASTNodeType.Program,
    body: [
      {
        type: ASTNodeType.ExpressionStatement,
        expression: {
          type: ASTNodeType.BinaryExpression,
          operator: "-",
          left: {
            type: ASTNodeType.BinaryExpression,
            operator: "+",
            left: {
              type: ASTNodeType.NumericLiteral,
              value: 3,
            },
            right: {
              type: ASTNodeType.NumericLiteral,
              value: 2,
            },
          },
          right: {
            type: ASTNodeType.NumericLiteral,
            value: 1,
          },
        },
      },
    ],
  });

  testFunc(`3 * 2 - 1 * 3;`, {
    type: ASTNodeType.Program,
    body: [
      {
        type: ASTNodeType.ExpressionStatement,
        expression: {
          type: ASTNodeType.BinaryExpression,
          operator: "-",
          left: {
            type: ASTNodeType.BinaryExpression,
            operator: "*",
            left: {
              type: ASTNodeType.NumericLiteral,
              value: 3,
            },
            right: {
              type: ASTNodeType.NumericLiteral,
              value: 2,
            },
          },
          right: {
            type: ASTNodeType.BinaryExpression,
            operator: "*",
            left: {
              type: ASTNodeType.NumericLiteral,
              value: 1,
            },
            right: {
              type: ASTNodeType.NumericLiteral,
              value: 3,
            },
          },
        },
      },
    ],
  });

  testFunc(`3 * (2 - 1);`, {
    type: ASTNodeType.Program,
    body: [
      {
        type: ASTNodeType.ExpressionStatement,
        expression: {
          type: ASTNodeType.BinaryExpression,
          operator: "*",
          left: {
            type: ASTNodeType.NumericLiteral,
            value: 3,
          },
          right: {
            type: ASTNodeType.BinaryExpression,
            operator: "-",
            left: {
              type: ASTNodeType.NumericLiteral,
              value: 2,
            },
            right: {
              type: ASTNodeType.NumericLiteral,
              value: 1,
            },
          },
        },
      },
    ],
  });

  console.log("Math tests passed");
};
