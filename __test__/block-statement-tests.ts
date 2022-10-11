import { ASTNodeType } from "../src/types";
import { TestFunc } from "./types";

export const blockStatementTests = (testFunc: TestFunc) => {
  testFunc(`{}`, {
    type: ASTNodeType.Program,
    body: [
      {
        type: ASTNodeType.BlockStatement,
        body: [],
      },
    ],
  });

  testFunc(
    `{
    {
      11;
    }
    "Hello";
  }`,
    {
      type: ASTNodeType.Program,
      body: [
        {
          type: ASTNodeType.BlockStatement,
          body: [
            {
              type: ASTNodeType.BlockStatement,
              body: [
                {
                  type: ASTNodeType.ExpressionStatement,
                  expression: {
                    type: ASTNodeType.NumericLiteral,
                    value: 11,
                  },
                },
              ],
            },
            {
              type: ASTNodeType.ExpressionStatement,
              expression: {
                type: ASTNodeType.StringLiteral,
                value: "Hello",
              },
            },
          ],
        },
      ],
    }
  );

  console.log("BlockStatement tests passed");
};
