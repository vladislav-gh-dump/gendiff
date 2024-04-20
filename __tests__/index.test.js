// import url from "url";
import path from "path";
import process from "process";
import parseFiles from "../src/parse-files.js";

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const __dirname = path.join(process.cwd(), "__tests__");
const getFixturePath = (filename) => path.join(__dirname, "..", "__fixtures__", filename);

test("gendiff json", () => {
  const filepath1 = getFixturePath("file1.json");
  const filepath2 = getFixturePath("file2.json");
  const expectedResult = "{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}";
  
  expect(parseFiles(filepath1, filepath2)).toEqual(expectedResult);
});
