import _ from "lodash";
import yaml from "js-yaml";

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load
}

export const getParser = (fileExt) => {
  if (!(_.has(parsers, fileExt))) {
    throw new Error(`Cannot get parser for ${fileExt}`);
  }
  return parsers[fileExt];
};
