import fs from "fs";
import path from "path";
import compareFiles from "./compare-files.js"

export default (filepath1, filepath2) => {
  const data1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const data2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
  
  return compareFiles(data1, data2);
};
