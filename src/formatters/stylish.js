import _ from "lodash";

const composeIndent = (depth, spacesCount, offset) => " ".repeat((depth * spacesCount) - offset);
const composeItem = (separator, key, value) => `${separator} ${key}: ${value}`;
const composeObject = (items, indent) => `{\n${items.join("\n")}\n${indent}}`;

const stringify = (value, depth) => {
  if (!(_.isObject(value))) {
    return `${value}`;
  }

  const indentLines = composeIndent(depth, 4, 2);
  const items = Object
    .entries(value)
    .map(([ key, value ]) => composeItem(`${indentLines} `, key, stringify(value, depth + 1)));
  
  const indentBrackets = composeIndent(depth, 4, 4);
  return composeObject(items, indentBrackets);
};

const composeStylishTree = (tree) => {
  const iter = (currentTree, depth) => {
    const indentLines = composeIndent(depth, 4, 2);
    const items = currentTree
      .map(({ stat, key, value }) => {
        switch (stat) {
          case "matched":
            return composeItem(`${indentLines} `, key, stringify(value, depth + 1));
          case "expected":
            return composeItem(`${indentLines}-`, key, stringify(value, depth + 1));
          case "received":
            return composeItem(`${indentLines}+`, key, stringify(value, depth + 1));
          case "nested":
            return composeItem(`${indentLines} `, key, iter(value, depth + 1));
          case "exchanged":
            const [ value1, value2 ] = value;
            const item1 = composeItem(`${indentLines}-`, key, stringify(value1, depth + 1));
            const item2 = composeItem(`${indentLines}+`, key, stringify(value2, depth + 1));
            return `${item1}\n${item2}`;
        }
      })
    
    const indentBrackets = composeIndent(depth, 4, 4);
    return composeObject(items, indentBrackets);
  }
  
  return iter(tree, 1);
};

export default composeStylishTree;
