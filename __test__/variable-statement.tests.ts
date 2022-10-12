import { ASTNodeType } from "../src/types";
import { TestFunc } from "./types";

export const variableStatementTests = (testFunc: TestFunc) => {
  testFunc(`let x = 1;`, {
    type: ASTNodeType.Program,
    body: [
      {
        type: ASTNodeType.VariableStatement,
        declarations: [
          {
            type: ASTNodeType.VariableDeclaration,
            id: {
              type: ASTNodeType.Identifier,
              name: "x",
            },
            init: {
              type: ASTNodeType.NumericLiteral,
              value: 1,
            },
          },
        ],
      },
    ],
  });

  testFunc(`let x, y = 1;`, {
    type: ASTNodeType.Program,
    body: [
      {
        type: ASTNodeType.VariableStatement,
        declarations: [
          {
            type: ASTNodeType.VariableDeclaration,
            id: {
              type: ASTNodeType.Identifier,
              name: "x",
            },
            init: null,
          },
          {
            type: ASTNodeType.VariableDeclaration,
            id: {
              type: ASTNodeType.Identifier,
              name: "y",
            },
            init: {
              type: ASTNodeType.NumericLiteral,
              value: 1,
            },
          },
        ],
      },
    ],
  });

  testFunc(`let x = y = 1 + 2;`, {
    type: ASTNodeType.Program,
    body: [
      {
        type: ASTNodeType.VariableStatement,
        declarations: [
          {
            type: ASTNodeType.VariableDeclaration,
            id: {
              type: ASTNodeType.Identifier,
              name: "x",
            },
            init: {
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
                  value: 1,
                },
                right: {
                  type: ASTNodeType.NumericLiteral,
                  value: 2,
                },
              },
            },
          },
        ],
      },
    ],
  });

  console.log("VariableStatement tests passed");
};
