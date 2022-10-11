import assert from "assert";
import Parser from "../src/Parser";
import { AST } from "../src/types";
import { literalTests } from "./literal-tests";

const parser = new Parser();

const testList = [literalTests];

const exec = () => {
  const program = `
    // sss
  11
  `;
  const res = parser.parse(program);
  console.log(res);
};

const testFunc = (program: string, target: AST) => {
  const ast = parser.parse(program);
  assert.deepEqual(ast, target);
};

testList.forEach((test) => {
  test(testFunc);
});

console.log("All test passed!");
