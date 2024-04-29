// import url from "url";
import path from "path";
import process from "process";

import makeAstDiff from "../src/ast.js";
import compareFiles from "../src/index.js";

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const __dirname = path.join(process.cwd(), "__tests__");
const getFixturePath = (filename) => path.join(__dirname, "..", "__fixtures__", filename);

const expectedStylishDiff = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const expectedPlainDiff = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

test("make ast diff", () => {
  const object1 = {
    "key1": "value1",
    "key2": "value2",
    "key3": {
      "key2": { "key": "value" },
    },
  }

  const object2 = {
    "key1": "value1",
    "key3": {
      "key2": "value2",
    },
    "key4": "value4",
  }
  
  const expected = [
    { 
      stat: "matched", 
      key: "key1", 
      value: "value1", 
    },
    { 
      stat: "expected", 
      key: "key2", 
      value: "value2", 
    },
    { 
      stat: "nested", 
      key: "key3", 
      value: [
        { 
          stat: "exchanged", 
          key: "key2", 
          value: [ { "key": "value" }, "value2" ] 
        },
      ]
    },
    { 
      stat: "received", 
      key: "key4", 
      value: "value4", 
    },
  ]

  const result = makeAstDiff(object1, object2);
  expect(result).toEqual(expected);
});

test("compare json files", () => {
  const filepath1 = getFixturePath("file1.json");
  const filepath2 = getFixturePath("file2.json");

  const stylishResult = compareFiles(filepath1, filepath2, "stylish");
  expect(stylishResult).toEqual(expectedStylishDiff);

  const plainResult = compareFiles(filepath1, filepath2, "plain");
  expect(plainResult).toEqual(expectedPlainDiff);
})

test("compare yaml files", () => {
  const filepath1 = getFixturePath("file1.yaml");
  const filepath2 = getFixturePath("file2.yaml");

  const stylishResult = compareFiles(filepath1, filepath2, "stylish");
  expect(stylishResult).toEqual(expectedStylishDiff);

  const plainResult = compareFiles(filepath1, filepath2, "plain");
  expect(plainResult).toEqual(expectedPlainDiff);
})
