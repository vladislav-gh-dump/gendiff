import _ from "lodash";


const makeItem = (stat, key, value) => ({ stat, key, value });

const makeAstDiff = (object1, object2) => {
  const mergedObject = { ...object1, ...object2 };
  const sortedKeys = _.keys(mergedObject).sort();
  
  let value;
  return sortedKeys.map((key) => {
    if (!(_.has(object1, key))) {
      value = object2[key];
      return makeItem("received", key, value);
    }

    if (!(_.has(object2, key))) {
      value = object1[key];
      return makeItem("expected", key, value);
    }

    const value1 = object1[key];
    const value2 = object2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      value = makeAstDiff(value1, value2);
      return makeItem("nested", key, value);
    }

    if (value1 === value2) {
      value = value1;
      return makeItem("matched", key, value);
    }

    value = [ value1, value2 ];
    return makeItem("exchanged", key, value);
  });
}

export default (object1, object2) => {
  try {
    return makeAstDiff(object1, object2);
  } catch (e) {
    throw new Error(`Cannot make ast diff: "${e}"`);
  }
};
