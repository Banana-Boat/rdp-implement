import assert from "assert";
import Parser from "../src/Parser";
import { ASTRoot } from "../src/types";
import { literalTests } from "./literal-tests";

const parser = new Parser();

// 自动化测试
const testList = [literalTests];
const testFunc = (program: string, target: ASTRoot) => {
  const ast = parser.parse(program);
  assert.deepEqual(ast, target);
};

testList.forEach((test) => {
  test(testFunc);
});

console.log("All auto test passed!");

// 手工测试
(() => {
  const program = `
    // sss
  11;
  `;
  const ast = parser.parse(program);
  console.log(JSON.stringify(ast, null, 2));
})();
