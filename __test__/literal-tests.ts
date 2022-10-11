import { ASTNodeType } from "../src/types";
import { TestFunc } from "./types";

export const literalTests = (testFunc: TestFunc) => {
  testFunc(`42`, {
    type: ASTNodeType.Program,
    body: {
      type: ASTNodeType.NumericLiteral,
      value: 42,
    },
  });

  testFunc(`" 22 "`, {
    type: ASTNodeType.Program,
    body: {
      type: ASTNodeType.StringLiteral,
      value: " 22 ",
    },
  });

  testFunc(`' 22 '`, {
    type: ASTNodeType.Program,
    body: {
      type: ASTNodeType.StringLiteral,
      value: " 22 ",
    },
  });
};
