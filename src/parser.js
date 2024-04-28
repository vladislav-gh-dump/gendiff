import { readFile, getFileExtension } from "./utils.js";
import yaml from "js-yaml";


const getParser = (fileExtension) => {
  switch (fileExtension) {
    case "json":
      return JSON.parse;
    case "yaml":
      return yaml.load;
    case "yml":
      return yaml.load;
  }
};

const parseFileData = (filepath) => {
  const fileData = readFile(filepath);
  const fileExtension = getFileExtension(filepath);

  const parser = getParser(fileExtension);
  return parser(fileData);
};

export default (filepath) => {
  try {
    return parseFileData(filepath);
  } catch (e) {
    throw new Error(`Cannot parse file data: ${e}`);
  }
};
