import fs from "fs";
import path from "path";
import parseFile from "./parsers.js";


const compareObjects = (object1, object2) => {
  const commonObject = { ...object1, ...object2 };
  const sortedKeys = Object.keys(commonObject).sort();

  let output = "";
  let line = "";

  sortedKeys.forEach((key) => {
    const hasKeyObject1 = Object.hasOwn(object1, key);
    const hasKeyObject2 = Object.hasOwn(object2, key);

    const value1 = hasKeyObject1 && object1[key];
    const value2 = hasKeyObject2 && object2[key]; 

    if (hasKeyObject1 === hasKeyObject2 !== false) {
      line = `    ${key}: ${value1}\n`;

      if (!(value1 === value2)) {
        line = `  - ${key}: ${value1}\n  + ${key}: ${value2}\n`;
      }
    } else {
      line = `  - ${key}: ${value1}\n`;

      if (!hasKeyObject1) {
        line = `  + ${key}: ${value2}\n`;
      }
    }

    output += line;
  });

  return `{\n${output}}`;
};


export default (filepath1, filepath2) => {
  const object1 = parseFile(filepath1);
  const object2 = parseFile(filepath2);
  
  return compareObjects(object1, object2);
};
