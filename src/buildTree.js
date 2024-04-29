import _ from "lodash";

const buildItem = (stat, key, value) => ({ stat, key, value });

const getItem = (object1, object2, key) => {
  if (!(_.has(object1, key))) {
    const value = object2[key];
    return buildItem("received", key, value);
  }

  if (!(_.has(object2, key))) {
    const value = object1[key];
    return buildItem("expected", key, value);
  }

  const value1 = object1[key];
  const value2 = object2[key];

  if (_.isObject(value1) && _.isObject(value2)) {
    const treeValue = buildTree(value1, value2);
    return buildItem("nested", key, treeValue);
  }

  if (value1 === value2) {
    return buildItem("matched", key, value1);
  }

  const value = [ value1, value2 ];
  return buildItem("exchanged", key, value);
}

const buildTree = (object1, object2) => {
  const mergedObject = { ...object1, ...object2 };
  const sortedKeys = _.keys(mergedObject).sort();
  
  return sortedKeys.map((key) => getItem(object1, object2, key));
}

export default buildTree;
