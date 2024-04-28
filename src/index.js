import parseFile from "./parser.js";
import makeAstDiff from "./ast.js";
import composeDiff from "./formatter/index.js";


export default (filepath1, filepath2, format) => {
  const object1 = parseFile(filepath1);
  const object2 = parseFile(filepath2);
  const astDiff = makeAstDiff(object1, object2);

  return composeDiff(astDiff, format);
};
