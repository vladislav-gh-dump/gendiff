import _ from "lodash";
import composeStylishTree from "./stylish.js";
import composePlainTree from "./plain.js";
import composeJsonTree from "./json.js";

const formatters = {
  stylish: composeStylishTree,
  plain: composePlainTree,
  json: composeJsonTree
}

export const getFormatter = (formatName) => {
  if (!(_.has(formatters, formatName))) {
    throw new Error(`Cannot get formatter "${formatName}"`);
  }
  return formatters[formatName];
};
