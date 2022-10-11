import { ASTNodeType } from "../src/types";
import { TestFunc } from "./types";

export const emptyStatementTests = (testFunc: TestFunc) => {
  testFunc(`;{}`, {
    type: ASTNodeType.Program,
    body: [
      {
        type: ASTNodeType.EmptyStatement,
        body: [],
      },
      {
        type: ASTNodeType.BlockStatement,
        body: [],
      },
    ],
  });

  console.log("EmptyStatement tests passed");
};
