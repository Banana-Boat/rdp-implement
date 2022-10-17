import { ASTNodeType } from "../src/types";
import { TestFunc } from "./types";

export const classDeclarationTests = (testFunc: TestFunc) => {
  testFunc(
    `
    class Pointer3D extends Pointer {
      function constructor(z) {
        super();
        this.z = z;
      }
    }
    let p = new Cat();
  `,
    {
      type: ASTNodeType.Program,
      body: [
        {
          type: ASTNodeType.ClassDeclaration,
          id: {
            type: ASTNodeType.Identifier,
            name: "Pointer3D",
          },
          superClass: {
            type: ASTNodeType.Identifier,
            name: "Pointer",
          },
          body: {
            type: ASTNodeType.BlockStatement,
            body: [
              {
                type: ASTNodeType.FunctionDeclaration,
                name: {
                  type: ASTNodeType.Identifier,
                  name: "constructor",
                },
                params: [
                  {
                    type: ASTNodeType.Identifier,
                    name: "z",
                  },
                ],
                body: {
                  type: ASTNodeType.BlockStatement,
                  body: [
                    {
                      type: ASTNodeType.ExpressionStatement,
                      expression: {
                        type: ASTNodeType.CallExpression,
                        callee: {
                          type: ASTNodeType.Super,
                        },
                        arguments: [],
                      },
                    },
                    {
                      type: ASTNodeType.ExpressionStatement,
                      expression: {
                        type: ASTNodeType.AssignmentExpression,
                        operator: "=",
                        left: {
                          type: ASTNodeType.MemberExpression,
                          computed: false,
                          object: {
                            type: ASTNodeType.ThisExpression,
                          },
                          property: {
                            type: ASTNodeType.Identifier,
                            name: "z",
                          },
                        },
                        right: {
                          type: ASTNodeType.Identifier,
                          name: "z",
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          type: ASTNodeType.VariableStatement,
          declarations: [
            {
              type: ASTNodeType.VariableDeclaration,
              id: {
                type: ASTNodeType.Identifier,
                name: "p",
              },
              init: {
                type: ASTNodeType.NewExpression,
                callee: {
                  type: ASTNodeType.Identifier,
                  name: "Cat",
                },
                arguments: [],
              },
            },
          ],
        },
      ],
    }
  );

  console.log("ClassDeclaration tests passed");
};
