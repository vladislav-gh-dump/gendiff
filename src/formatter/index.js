import composeStylishDiff from "./stylish.js";

const getFormatter = (format) => {
  switch (format) {
    case "stylish":
      return composeStylishDiff;
  }
};

const composeDiff = (astDiff, format) => {
  const formatter = getFormatter(format);
  return formatter(astDiff);
};

export default (astDiff, format) => {
  try {
    return composeDiff(astDiff, format);
  } catch (e) {
    throw new Error(`Cannot compose diff: ${e}`);
  }
};
