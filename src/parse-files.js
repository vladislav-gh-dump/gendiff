import fs from "fs";
import path from "path";

export default (filepath1, filepath2) => {
  const data1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const data2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
  console.log(data1);
  console.log(data2);
}
