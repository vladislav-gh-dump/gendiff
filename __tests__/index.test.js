import path from "path";
import compareFiles from "../src/index.js";

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

const expectedJsonDiff = `[
  {
    "stat": "nested",
    "key": "common",
    "value": [
      {
        "stat": "received",
        "key": "follow",
        "value": false
      },
      {
        "stat": "matched",
        "key": "setting1",
        "value": "Value 1"
      },
      {
        "stat": "expected",
        "key": "setting2",
        "value": 200
      },
      {
        "stat": "exchanged",
        "key": "setting3",
        "value": [
          true,
          null
        ]
      },
      {
        "stat": "received",
        "key": "setting4",
        "value": "blah blah"
      },
      {
        "stat": "received",
        "key": "setting5",
        "value": {
          "key5": "value5"
        }
      },
      {
        "stat": "nested",
        "key": "setting6",
        "value": [
          {
            "stat": "nested",
            "key": "doge",
            "value": [
              {
                "stat": "exchanged",
                "key": "wow",
                "value": [
                  "",
                  "so much"
                ]
              }
            ]
          },
          {
            "stat": "matched",
            "key": "key",
            "value": "value"
          },
          {
            "stat": "received",
            "key": "ops",
            "value": "vops"
          }
        ]
      }
    ]
  },
  {
    "stat": "nested",
    "key": "group1",
    "value": [
      {
        "stat": "exchanged",
        "key": "baz",
        "value": [
          "bas",
          "bars"
        ]
      },
      {
        "stat": "matched",
        "key": "foo",
        "value": "bar"
      },
      {
        "stat": "exchanged",
        "key": "nest",
        "value": [
          {
            "key": "value"
          },
          "str"
        ]
      }
    ]
  },
  {
    "stat": "expected",
    "key": "group2",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  {
    "stat": "received",
    "key": "group3",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
]`;

const exts = [ "json", "yaml" ];
const formats = [ "stylish", "plain", "json" ];
const expectedDiffs = [ expectedStylishDiff, expectedPlainDiff, expectedJsonDiff ];

describe("test gendiff", () => {
  exts.forEach((ext) => {
    const filepath1 = getFixturePath(`file1.${ext}`);
    const filepath2 = getFixturePath(`file2.${ext}`);

    formats.forEach((format, index) => {
      const expectedDiff = expectedDiffs[index];

      test(`format ${format}, extension ${ext}`, () => {
        const result = compareFiles(filepath1, filepath2, format);
        expect(result).toEqual(expectedDiff);
      })
    })
  })
});
