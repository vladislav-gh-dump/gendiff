import fs from "fs";
import path from "path";
import yaml from "js-yaml";


const getParser = (filepath) => {
  const extFile = path.extname(filepath).split(".")[1];

  switch (extFile) {
    case "json":
      return JSON.parse;
    case "yaml":
      return yaml.load;
    case "yml":
      return yaml.load;
    default:
      throw new Error("Unknown ext!");
  }
};


const getFileData = (filepath) => {
  try {
    return fs.readFileSync(path.resolve(filepath));
  } catch (e) {
    throw new Error("Can`t get file data!");
  }
};


export default (filepath) => {
  const fileData = getFileData(filepath);
  const parser = getParser(filepath);
  return parser(fileData);
};
