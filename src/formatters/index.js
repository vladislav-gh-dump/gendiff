import composeStylishDiff from "./stylish.js";

const getFormatter = (formatName) => {
  switch (formatName) {
    case "stylish":
      return composeStylishDiff;
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
