import { ASTNodeType } from "../src/types";
import { TestFunc } from "./types";

export const unaryExpressionTests = (testFunc: TestFunc) => {
  testFunc(`!-x;`, {
    type: ASTNodeType.Program,
    body: [
      {
        type: ASTNodeType.ExpressionStatement,
        expression: {
          type: ASTNodeType.UnaryExpression,
          operator: "!",
          argument: {
            type: ASTNodeType.UnaryExpression,
            operator: "-",
            argument: {
              type: ASTNodeType.Identifier,
              name: "x",
            },
          },
        },
      },
    ],
  });

  testFunc(`-x * +x;`, {
    type: ASTNodeType.Program,
    body: [
      {
        type: ASTNodeType.ExpressionStatement,
        expression: {
          type: ASTNodeType.BinaryExpression,
          operator: "*",
          left: {
            type: ASTNodeType.UnaryExpression,
            operator: "-",
            argument: {
              type: ASTNodeType.Identifier,
              name: "x",
            },
          },
          right: {
            type: ASTNodeType.UnaryExpression,
            operator: "+",
            argument: {
              type: ASTNodeType.Identifier,
              name: "x",
            },
          },
        },
      },
    ],
  });

  console.log("UnaryExpression tests passed");
};
