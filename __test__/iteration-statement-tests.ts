import { ASTNodeType } from "../src/types";
import { TestFunc } from "./types";

export const iterationStatementTests = (testFunc: TestFunc) => {
  testFunc(`while(x < 10) {}`, {
    type: ASTNodeType.Program,
    body: [
      {
        type: ASTNodeType.WhileStatement,
        test: {
          type: ASTNodeType.BinaryExpression,
          operator: "<",
          left: {
            type: ASTNodeType.Identifier,
            name: "x",
          },
          right: {
            type: ASTNodeType.NumericLiteral,
            value: 10,
          },
        },
        body: {
          type: ASTNodeType.BlockStatement,
          body: [],
        },
      },
    ],
  });

  testFunc(
    `
    do{
      !x;
    } while (x)
  `,
    {
      type: ASTNodeType.Program,
      body: [
        {
          type: ASTNodeType.DoWhileStatement,
          test: {
            type: ASTNodeType.Identifier,
            name: "x",
          },
          body: {
            type: ASTNodeType.BlockStatement,
            body: [
              {
                type: ASTNodeType.ExpressionStatement,
                expression: {
                  type: ASTNodeType.UnaryExpression,
                  operator: "!",
                  argument: {
                    type: ASTNodeType.Identifier,
                    name: "x",
                  },
                },
              },
            ],
          },
        },
      ],
    }
  );

  testFunc(`for(let i = 0; i < 10; i = i + 2) {}`, {
    type: ASTNodeType.Program,
    body: [
      {
        type: ASTNodeType.ForStatement,
        init: {
          type: ASTNodeType.VariableStatement,
          declarations: [
            {
              type: ASTNodeType.VariableDeclaration,
              id: {
                type: ASTNodeType.Identifier,
                name: "i",
              },
              init: {
                type: ASTNodeType.NumericLiteral,
                value: 0,
              },
            },
          ],
        },
        test: {
          type: ASTNodeType.BinaryExpression,
          operator: "<",
          left: {
            type: ASTNodeType.Identifier,
            name: "i",
          },
          right: {
            type: ASTNodeType.NumericLiteral,
            value: 10,
          },
        },
        update: {
          type: ASTNodeType.AssignmentExpression,
          operator: "=",
          left: {
            type: ASTNodeType.Identifier,
            name: "i",
          },
          right: {
            type: ASTNodeType.BinaryExpression,
            operator: "+",
            left: {
              type: ASTNodeType.Identifier,
              name: "i",
            },
            right: {
              type: ASTNodeType.NumericLiteral,
              value: 2,
            },
          },
        },
        body: {
          type: ASTNodeType.BlockStatement,
          body: [],
        },
      },
    ],
  });

  testFunc(`for(; ; ) ;`, {
    type: ASTNodeType.Program,
    body: [
      {
        type: ASTNodeType.ForStatement,
        init: null,
        test: null,
        update: null,
        body: {
          type: ASTNodeType.EmptyStatement,
          body: [],
        },
      },
    ],
  });

  console.log("Iteration tests passed");
};
