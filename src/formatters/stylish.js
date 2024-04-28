import _ from "lodash";


const composeIndent = (depth, spacesCount, offset) => " ".repeat((depth * spacesCount) - offset);

const composeItem = (separator, key, value) => `${separator} ${key}: ${value}`;

const composeObject = (items, indent) => `{\n${items.join("\n")}\n${indent}}`;

const stringify = (value, depth) => {
  if (!(_.isObject(value))) {
    return `${value}`;
  }

  const indentLines = composeIndent(depth, 4, 2);
  const indentBrackets = composeIndent(depth, 4, 4);

  const separator = `${indentLines} `;
  const items = Object
    .entries(value)
    .map(([ key, value ]) => {
      const stringValue = stringify(value, depth + 1);
      return composeItem(separator, key, stringValue);
    })
  
  return composeObject(items, indentBrackets);
};

export default (astDiff) => {
  const iter = (currentAstDiff, depth) => {
    const indentLines = composeIndent(depth, 4, 2);
    const indentBrackets = composeIndent(depth, 4, 4);

    let separator, stringValue;
    const items = currentAstDiff
      .map(({ stat, key, value }) => {
        stringValue = stringify(value, depth + 1);

        switch (stat) {
          case "matched":
            separator = `${indentLines} `;
            break;
    
          case "expected":
            separator = `${indentLines}-`;
            break;
    
          case "received":
            separator = `${indentLines}+`;
            break;

          case "nested":
            separator = `${indentLines} `;
            stringValue = iter(value, depth + 1);
            break;

          case "exchanged":
            const [ value1, value2 ] = value;
            
            separator = `${indentLines}-`;
            stringValue = stringify(value1, depth + 1);
            const item1 = composeItem(separator, key, stringValue);

            separator = `${indentLines}+`;
            stringValue = stringify(value2, depth + 1);
            const item2 = composeItem(separator, key, stringValue);
            
            return `${item1}\n${item2}`;
        }

        return composeItem(separator, key, stringValue);
      })

    return composeObject(items, indentBrackets);
  }
  
  return iter(astDiff, 1);
};
