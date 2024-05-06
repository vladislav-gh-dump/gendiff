import _ from 'lodash';

const composeIndent = (depth, spacesCount = 4, offset = 2) => ' '.repeat((depth * spacesCount) - offset);
const stringify = (item, depth) => {
  if (!(_.isObject(item))) {
    return `${item}`;
  }
  const indentLines = composeIndent(depth);
  const items = Object
    .entries(item)
    .map(([key, value]) => `${indentLines}  ${key}: ${stringify(value, depth + 1)}`);

  const indentBrackets = composeIndent(depth, 4, 4);
  return `{\n${items.join('\n')}\n${indentBrackets}}`;
};

export default (tree) => {
  const iter = (currentTree, depth) => {
    const indentLines = composeIndent(depth);
    const items = currentTree
      .map((node) => {
        const { stat } = node;
        switch (stat) {
          case 'matched': {
            const { key, value } = node;
            return `${indentLines}  ${key}: ${stringify(value, depth + 1)}`;
          }
          case 'expected': {
            const { key, value } = node;
            return `${indentLines}- ${key}: ${stringify(value, depth + 1)}`;
          }
          case 'received': {
            const { key, value } = node;
            return `${indentLines}+ ${key}: ${stringify(value, depth + 1)}`;
          }
          case 'nested': {
            const { key, children } = node;
            return `${indentLines}  ${key}: ${iter(children, depth + 1)}`;
          }
          case 'exchanged': {
            const { key, values } = node;
            const { from: valueFrom, to: valueTo } = values;
            const itemFrom = `${indentLines}- ${key}: ${stringify(valueFrom, depth + 1)}`;
            const itemTo = `${indentLines}+ ${key}: ${stringify(valueTo, depth + 1)}`;
            return `${itemFrom}\n${itemTo}`;
          }
          default: {
            throw new Error(`Unknown stat "${stat}"`);
          }
        }
      });
    const indentBrackets = composeIndent(depth, 4, 4);
    return `{\n${items.join('\n')}\n${indentBrackets}}`;
  };
  return iter(tree, 1);
};
