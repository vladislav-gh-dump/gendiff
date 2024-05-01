import path from "path";
import { readFile } from "../src/utils.js";
import compareFiles from "../src/index.js";

const __dirname = path.join(process.cwd(), "__tests__");
const getFixturePath = (filename) => path.join(__dirname, "..", "__fixtures__", filename);


const exts = [ 
  [ "json", "json" ],
  [ "yaml", "yaml" ],
  [ "json", "yaml" ], 
];
const formats = [ "stylish", "plain", "json" ];

describe
  .each(exts)("gendiff filepath1.%s filepath2.%s", (ext1, ext2) => {
    const filepath1 = getFixturePath(`nested/file1.${ext1}`);
    const filepath2 = getFixturePath(`nested/file2.${ext2}`);

    test.each(formats)("--format %s", (format) => {
      const result = compareFiles(filepath1, filepath2, format);
      const expected = readFile(getFixturePath(`expectedDiffs/${format}.txt`));

      expect(result).toEqual(expected);
    });
  });
