import composeStylishDiff from "./stylish.js";
import composePlainDiff from "./plain.js";
import composeJsonDiff from "./json.js";


const getFormatter = (formatName) => {
  switch (formatName) {
    case "stylish":
      return composeStylishDiff;
    case "plain":
      return composePlainDiff;
    case "json":
      return composeJsonDiff;
  }
};

const composeDiff = (astDiff, formatName) => {
  const formatter = getFormatter(formatName);
  return formatter(astDiff);
};

export default (astDiff, formatName) => {
  try {
    return composeDiff(astDiff, formatName);
  } catch (e) {
    throw new Error(`Cannot compose diff: ${e}`);
  }
};
