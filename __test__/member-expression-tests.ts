import { ASTNodeType } from "../src/types";
import { TestFunc } from "./types";

export const memberExpressionTests = (testFunc: TestFunc) => {
  testFunc(`x.y['name'] = 'terry';`, {
    type: ASTNodeType.Program,
    body: [
      {
        type: ASTNodeType.ExpressionStatement,
        expression: {
          type: ASTNodeType.AssignmentExpression,
          operator: "=",
          left: {
            type: ASTNodeType.MemberExpression,
            computed: true,
            object: {
              type: ASTNodeType.MemberExpression,
              computed: false,
              object: {
                type: ASTNodeType.Identifier,
                name: "x",
              },
              property: {
                type: ASTNodeType.Identifier,
                name: "y",
              },
            },
            property: {
              type: ASTNodeType.StringLiteral,
              value: "name",
            },
          },
          right: {
            type: ASTNodeType.StringLiteral,
            value: "terry",
          },
        },
      },
    ],
  });

  console.log("MemberExpression tests passed");
};
