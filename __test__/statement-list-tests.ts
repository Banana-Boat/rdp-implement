import { ASTNodeType } from "../src/types";
import { TestFunc } from "./types";

export const statementListTests = (testFunc: TestFunc) => {
  testFunc(
    `
    "Hello";
    42;
  `,
    {
      type: ASTNodeType.Program,
      body: [
        {
          type: ASTNodeType.ExpressionStatement,
          expression: {
            type: ASTNodeType.StringLiteral,
            value: "Hello",
          },
        },
        {
          type: ASTNodeType.ExpressionStatement,
          expression: {
            type: ASTNodeType.NumericLiteral,
            value: 42,
          },
        },
      ],
    }
  );

  console.log("Statement tests passed");
};
