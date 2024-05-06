import _ from "lodash";

const getItem = (object1, object2, key) => {
  if (!(_.has(object1, key))) {
    return {
      stat: "received",
      key,
      value: object2[key]
    }
  }

  if (!(_.has(object2, key))) {
    return {
      stat: "expected",
      key,
      value: object1[key]
    }
  }

  if (_.isObject(object1[key]) && _.isObject(object2[key])) {
    const tree = buildTree(object1[key], object2[key]);
    return {
      stat: "nested",
      key,
      value: tree
    }
  }

  if (object1[key] === object2[key]) {
    return {
      stat: "matched",
      key,
      value: object1[key]
    }
  }

  return {
    stat: "exchanged",
    key,
    value: [ object1[key], object2[key] ]
  }
}

const buildTree = (object1, object2) => {
  const mergedObject = { ...object1, ...object2 };
  const sortedKeys = _.keys(mergedObject).sort();
  
  return sortedKeys.map((key) => getItem(object1, object2, key));
}

export default buildTree;
