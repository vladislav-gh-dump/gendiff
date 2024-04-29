import _ from "lodash";

const composeComplexValue = (value) => (_.isObject(value) ? "[complex value]" : value);
const composeValue = (value) => (_.isString(value) ? `'${value}'` : composeComplexValue(value));

const composePlainTree = (tree) => {
  const iter = (currentTree, chainKeys) => {
    const lines = currentTree
      .flatMap(({ stat, key, value }) => {
        switch (stat) {
          case "matched":
            return [];
          case "expected":
            return `Property '${chainKeys}${key}' was removed`;
          case "received":
            const stringValue = composeValue(value);
            return `Property '${chainKeys}${key}' was added with value: ${stringValue}`;
          case "nested":
            return iter(value, `${chainKeys}${key}.`);
          case "exchanged":
            const [ valueFrom, valueTo ] = value;
            const stringValueFrom = composeValue(valueFrom);
            const stringValueTo = composeValue(valueTo);
            const stringValues = `From ${stringValueFrom} to ${stringValueTo}`;
            return `Property '${chainKeys}${key}' was updated. ${stringValues}`;
        }
      })

    return lines.join("\n");
  }
  
  return iter(tree, "");
};

export default composePlainTree;
