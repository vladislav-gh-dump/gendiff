import _ from "lodash";


const composeComplexValue = (value) => (_.isObject(value) ? "[complex value]" : value);

const composeValue = (value) => (_.isString(value) ? `'${value}'` : composeComplexValue(value));

export default (astDiff) => {
  const iter = (currentAstDiff, chainKeys) => {
    const lines = currentAstDiff
      .flatMap(({ stat, key, value }) => {
        switch (stat) {
          case "matched":
            return [];
    
          case "expected":
            return `Property '${chainKeys}${key}' was removed`;
    
          case "received":
            return `Property '${chainKeys}${key}' was added with value: ${composeValue(value)}`;

          case "nested":
            return iter(value, `${chainKeys}${key}.`);

          case "exchanged":
            const [ value1, value2 ] = value;
            return `Property '${chainKeys}${key}' was updated. From ${composeValue(value1)} to ${composeValue(value2)}`;
        }
      })

    return lines.join("\n");
  }
  
  return iter(astDiff, "");
};
