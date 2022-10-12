import { ASTNodeType } from "../src/types";
import { TestFunc } from "./types";

export const assignmentStatementTests = (testFunc: TestFunc) => {
  testFunc(`x = y = 3 + 2;`, {
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
            type: ASTNodeType.AssignmentExpression,
            operator: "=",
            left: {
              type: ASTNodeType.Identifier,
              name: "y",
            },
            right: {
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
          },
        },
      },
    ],
  });

  console.log("AssignmentStatement tests passed");
};
