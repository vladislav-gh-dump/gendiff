import _ from 'lodash';

const composeComplexValue = (value) => (_.isObject(value) ? '[complex value]' : value);
const composeValue = (value) => (_.isString(value) ? `'${value}'` : composeComplexValue(value));

export default (tree) => {
  const iter = (currentNode, chainKeys) => {
    const lines = currentNode
      .flatMap((node) => {
        const { stat, key } = node;
        switch (stat) {
          case 'matched': {
            return [];
          }
          case 'expected': {
            return `Property '${chainKeys}${key}' was removed`;
          }
          case 'received': {
            const { value } = node;
            return `Property '${chainKeys}${key}' was added with value: ${composeValue(value)}`;
          }
          case 'nested': {
            const { children } = node;
            return iter(children, `${chainKeys}${key}.`);
          }
          case 'exchanged': {
            const { values } = node;
            const { from: valueFrom, to: valueTo } = values;
            return [
              `Property '${chainKeys}${key}' was updated.`,
              `From ${composeValue(valueFrom)} to ${composeValue(valueTo)}`,
            ].join(' ');
          }
          default: {
            throw new Error(`Unknown stat "${stat}"`);
          }
        }
      });
    return lines.join('\n');
  };
  return iter(tree, '');
};
