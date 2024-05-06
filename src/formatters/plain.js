import _ from 'lodash';

const composeComplexValue = (value) => (_.isObject(value) ? '[complex value]' : value);
const composeValue = (value) => (_.isString(value) ? `'${value}'` : composeComplexValue(value));

export default (tree) => {
  const iter = (currentTree, chainKeys) => {
    const lines = currentTree
      .flatMap((node) => {
        const { stat } = node;
        switch (stat) {
          case 'matched': {
            return [];
          }
          case 'expected': {
            const { key } = node;
            return `Property '${chainKeys}${key}' was removed`;
          }
          case 'received': {
            const { key, value } = node;
            return `Property '${chainKeys}${key}' was added with value: ${composeValue(value)}`;
          }
          case 'nested': {
            const { key, children } = node;
            return iter(children, `${chainKeys}${key}.`);
          }
          case 'exchanged': {
            const { key, values } = node;
            const { from: valueFrom, to: valueTo } = values;
            const stringValues = `From ${composeValue(valueFrom)} to ${composeValue(valueTo)}`;
            return `Property '${chainKeys}${key}' was updated. ${stringValues}`;
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
