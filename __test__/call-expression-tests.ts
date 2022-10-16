import { ASTNodeType } from "../src/types";
import { TestFunc } from "./types";

export const callExpressionTests = (testFunc: TestFunc) => {
  testFunc(`square(x = 1)();`, {
    type: ASTNodeType.Program,
    body: [
      {
        type: ASTNodeType.ExpressionStatement,
        expression: {
          type: ASTNodeType.CallExpression,
          callee: {
            type: ASTNodeType.CallExpression,
            callee: {
              type: ASTNodeType.Identifier,
              name: "square",
            },
            arguments: [
              {
                type: ASTNodeType.AssignmentExpression,
                operator: "=",
                left: {
                  type: ASTNodeType.Identifier,
                  name: "x",
                },
                right: {
                  type: ASTNodeType.NumericLiteral,
                  value: 1,
                },
              },
            ],
          },
          arguments: [],
        },
      },
    ],
  });

  testFunc(`console.log('hello world');`, {
    type: ASTNodeType.Program,
    body: [
      {
        type: ASTNodeType.ExpressionStatement,
        expression: {
          type: ASTNodeType.CallExpression,
          callee: {
            type: ASTNodeType.MemberExpression,
            computed: false,
            object: {
              type: ASTNodeType.Identifier,
              name: "console",
            },
            property: {
              type: ASTNodeType.Identifier,
              name: "log",
            },
          },
          arguments: [
            {
              type: ASTNodeType.StringLiteral,
              value: "hello world",
            },
          ],
        },
      },
    ],
  });

  console.log("CallExpression tests passed");
};
