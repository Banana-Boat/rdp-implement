import assert from "assert";
import Parser from "../src/Parser";
import { ASTRoot } from "../src/types";
import { literalTests } from "./literal-tests";
import { statementListTests } from "./statement-list-tests";
import { blockStatementTests } from "./block-statement-tests";
import { emptyStatementTests } from "./empty-statement.tests";
import { mathTests } from "./math-tests";
import { assignmentStatementTests } from "./assignment-statement-tests";
import { variableStatementTests } from "./variable-statement.tests";
import { ifStatementTests } from "./if-statement-tests";
import { relationalEqualityLogicalExpressionTests } from "./relational-equality-logical-expression-tests";
import { unaryExpressionTests } from "./unary-expression-tests";

const parser = new Parser();

// 手工测试
(() => {
  const program = `-x * -x;`;
  const ast = parser.parse(program);
  console.log(JSON.stringify(ast, null, 2));
})();

console.log("-------------------------------------------------");

// 自动化测试
const testList = [
  literalTests,
  statementListTests,
  blockStatementTests,
  emptyStatementTests,
  mathTests,
  assignmentStatementTests,
  variableStatementTests,
  ifStatementTests,
  relationalEqualityLogicalExpressionTests,
  unaryExpressionTests,
];
const testFunc = (program: string, target: ASTRoot) => {
  const ast = parser.parse(program);
  assert.deepEqual(ast, target);
};

testList.forEach((test) => {
  test(testFunc);
});

console.log("-------------------------------------------------");
console.log("All auto test passed!");
