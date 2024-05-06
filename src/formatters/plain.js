import _ from 'lodash';

const composeComplexValue = (value) => (_.isObject(value) ? '[complex value]' : value);
const composeValue = (value) => (_.isString(value) ? `'${value}'` : composeComplexValue(value));

export default (tree) => {
  const iter = (currentTree, chainKeys) => {
    const lines = currentTree
      .flatMap(({ stat, key, value }) => {
        switch (stat) {
          case 'matched':
            return [];
          case 'expected':
            return `Property '${chainKeys}${key}' was removed`;
          case 'received':
            return `Property '${chainKeys}${key}' was added with value: ${composeValue(value)}`;
          case 'nested':
            return iter(value, `${chainKeys}${key}.`);
          case 'exchanged':
            const [valueFrom, valueTo] = value;
            const stringValues = `From ${composeValue(valueFrom)} to ${composeValue(valueTo)}`;
            return `Property '${chainKeys}${key}' was updated. ${stringValues}`;
        }
      });
    return lines.join('\n');
  };
  return iter(tree, '');
};
