// import url from "url";
import path from "path";
import process from "process";
import compareFiles from "../src/comparator.js";

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const __dirname = path.join(process.cwd(), "__tests__");
const getFixturePath = (filename) => path.join(__dirname, "..", "__fixtures__", filename);


let filepath1, filepath2;
const filepathes = {
  json: {
    file1: getFixturePath("file1.json"),
    file2: getFixturePath("file2.json"),
  },
  yaml: {
    file1: getFixturePath("file1.yaml"),
    file2: getFixturePath("file2.yaml"),
  },
  yml: {
    file1: getFixturePath("file1.yml"),
    file2: getFixturePath("file2.yml"),
  }
}
const expectedResult = "{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}";


test("gendiff same formats", () => {
  filepath1 = filepathes.json.file1;
  filepath2 = filepathes.json.file2;
  expect(compareFiles(filepath1, filepath2)).toEqual(expectedResult);

  filepath1 = filepathes.yaml.file1;
  filepath2 = filepathes.yaml.file2;
  expect(compareFiles(filepath1, filepath2)).toEqual(expectedResult);

  filepath1 = filepathes.yml.file1;
  filepath2 = filepathes.yml.file2;
  expect(compareFiles(filepath1, filepath2)).toEqual(expectedResult);
});

test("gendiff difference formats", () => {
  filepath1 = filepathes.json.file1;
  filepath2 = filepathes.yaml.file2;
  expect(compareFiles(filepath1, filepath2)).toEqual(expectedResult);

  filepath1 = filepathes.json.file1;
  filepath2 = filepathes.yml.file2;
  expect(compareFiles(filepath1, filepath2)).toEqual(expectedResult);

  filepath1 = filepathes.yaml.file1;
  filepath2 = filepathes.yml.file2;
  expect(compareFiles(filepath1, filepath2)).toEqual(expectedResult);
});

test("gendiff unknown format", () => {
  filepath1 = "file.g";
  expect(() => compareFiles(filepath1, filepath2)).toThrow();
});

test("gendiff unknown file", () => {
  filepath1 = "file.json";
  expect(() => compareFiles(filepath1, filepath2)).toThrow();
});
