import _ from 'lodash';

const buildTree = (object1, object2) => {
  const mergedObject = { ...object1, ...object2 };
  const sortedKeys = _.sortBy(_.keys(mergedObject));

  return sortedKeys.map((key) => {
    if (!(_.has(object1, key))) {
      return { stat: 'received', key, value: object2[key] };
    }
    if (!(_.has(object2, key))) {
      return { stat: 'expected', key, value: object1[key] };
    }
    if (_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
      const children = buildTree(object1[key], object2[key]);
      return { stat: 'nested', key, children };
    }
    if (object1[key] === object2[key]) {
      return { stat: 'matched', key, value: object1[key] };
    }
    const values = { from: object1[key], to: object2[key] };
    return { stat: 'exchanged', key, values };
  });
};

export default buildTree;
