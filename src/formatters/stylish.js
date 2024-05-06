import _ from "lodash";

const composeIndent = (depth, spacesCount = 4, offset = 2) => " ".repeat((depth * spacesCount) - offset);

const stringify = (value, depth) => {
  if (!(_.isObject(value))) {
    return `${value}`;
  }

  const indentLines = composeIndent(depth);
  const items = Object
    .entries(value)           
    .map(([ key, value ]) => `${indentLines}  ${key}: ${stringify(value, depth + 1)}`);
  
  const indentBrackets = composeIndent(depth, 4, 4);
  return `{\n${items.join("\n")}\n${indentBrackets}}`;
};

const composeStylishTree = (tree) => {
  const iter = (currentTree, depth) => {
    const indentLines = composeIndent(depth);
    const items = currentTree
      .map(({ stat, key, value }) => {
        switch (stat) {
          case "matched":
            return `${indentLines}  ${key}: ${stringify(value, depth + 1)}`;
          case "expected":
            return `${indentLines}- ${key}: ${stringify(value, depth + 1)}`;
          case "received":
            return `${indentLines}+ ${key}: ${stringify(value, depth + 1)}`;
          case "nested":
            return `${indentLines}  ${key}: ${iter(value, depth + 1)}`;
          case "exchanged":
            const [ valueFrom, valueTo ] = value;
            const itemFrom = `${indentLines}- ${key}: ${stringify(valueFrom, depth + 1)}`;
            const itemTo   = `${indentLines}+ ${key}: ${stringify(valueTo,   depth + 1)}`;
            return `${itemFrom}\n${itemTo}`;
        }
      })
    
    const indentBrackets = composeIndent(depth, 4, 4);
    return `{\n${items.join("\n")}\n${indentBrackets}}`;
  }
  
  return iter(tree, 1);
};

export default composeStylishTree;
