import { ASTNodeType } from "../src/types";
import { TestFunc } from "./types";

export const ifStatementTests = (testFunc: TestFunc) => {
  testFunc(
    `
    if(x){
      x = 1;
    } 
  `,
    {
      type: ASTNodeType.Program,
      body: [
        {
          type: ASTNodeType.IfStatement,
          test: {
            type: ASTNodeType.Identifier,
            name: "x",
          },
          consequent: {
            type: ASTNodeType.BlockStatement,
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
                    type: ASTNodeType.NumericLiteral,
                    value: 1,
                  },
                },
              },
            ],
          },
          alternate: null,
        },
      ],
    }
  );

  testFunc(
    `
    if(x){
      x = 1;
    } else {
      x = 0;
    }
  `,
    {
      type: ASTNodeType.Program,
      body: [
        {
          type: ASTNodeType.IfStatement,
          test: {
            type: ASTNodeType.Identifier,
            name: "x",
          },
          consequent: {
            type: ASTNodeType.BlockStatement,
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
                    type: ASTNodeType.NumericLiteral,
                    value: 1,
                  },
                },
              },
            ],
          },
          alternate: {
            type: ASTNodeType.BlockStatement,
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
                    type: ASTNodeType.NumericLiteral,
                    value: 0,
                  },
                },
              },
            ],
          },
        },
      ],
    }
  );

  console.log("IfStatement tests passed");
};
