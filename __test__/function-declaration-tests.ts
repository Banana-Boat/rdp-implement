import { ASTNodeType } from "../src/types";
import { TestFunc } from "./types";

export const functionDeclarationTests = (testFunc: TestFunc) => {
  testFunc(
    `
    function volume(a, b, c) {
      return a * b * c;
    }
  `,
    {
      type: ASTNodeType.Program,
      body: [
        {
          type: ASTNodeType.FunctionDeclaration,
          name: {
            type: ASTNodeType.Identifier,
            name: "volume",
          },
          params: [
            {
              type: ASTNodeType.Identifier,
              name: "a",
            },
            {
              type: ASTNodeType.Identifier,
              name: "b",
            },
            {
              type: ASTNodeType.Identifier,
              name: "c",
            },
          ],
          body: {
            type: ASTNodeType.BlockStatement,
            body: [
              {
                type: ASTNodeType.ReturnStatement,
                argument: {
                  type: ASTNodeType.BinaryExpression,
                  operator: "*",
                  left: {
                    type: ASTNodeType.BinaryExpression,
                    operator: "*",
                    left: {
                      type: ASTNodeType.Identifier,
                      name: "a",
                    },
                    right: {
                      type: ASTNodeType.Identifier,
                      name: "b",
                    },
                  },
                  right: {
                    type: ASTNodeType.Identifier,
                    name: "c",
                  },
                },
              },
            ],
          },
        },
      ],
    }
  );

  console.log("FunctionDeclaration tests passed");
};
