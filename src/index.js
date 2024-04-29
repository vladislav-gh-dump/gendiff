import parseFile from "./parser.js";
import buildTree from "./buildTree.js";
import composeDiff from "./formatters/index.js";


export default (filepath1, filepath2, formatName) => {
  const object1 = parseFile(filepath1);
  const object2 = parseFile(filepath2);
  const astDiff = buildTree(object1, object2);

  return composeDiff(astDiff, formatName);
};
