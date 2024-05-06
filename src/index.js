import buildTree from "./buildTree.js";

import { getParser } from "./parsers.js";
import { getFormatter } from "./formatters/index.js";
import { readFile, getFileExt } from "./utils.js";

const getData = (filepath) => {
  const fileExt = getFileExt(filepath);
  const fileData = readFile(filepath);
    
  const parser = getParser(fileExt);
  return parser(fileData);
}

const composeDiff = (tree, formatName) => {
  const formatter = getFormatter(formatName);
  return formatter(tree);
}

const genDiff = (filepath1, filepath2, formatName = "stylish") => {
  const object1 = getData(filepath1);
  const object2 = getData(filepath2);

  const tree = buildTree(object1, object2);
  return composeDiff(tree, formatName);
};

export default genDiff;
