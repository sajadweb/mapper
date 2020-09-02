/* eslint-disable prettier/prettier */
const _ = require("lodash");
class Mapper {
  static convert = (source, destination) => (customizer) => {
    let map = {};
    _.forIn(destination, (key, value) => {
      if (_.isObject(key)) {
        map[value] = Mapper.loader(key, source);
      } else {
        map[value] = _.get(source, key || value, null);
      }
    });
    if (customizer) {
      (async () => {
        map = await customizer(map);
      })();
    }
    return map;
  };

  static loader = (destination, source) => {
    let map = {};
    _.forIn(destination, (key, value) => {
      if (_.isObject(key)) {
        map[value] = Mapper.loader(key, source);
      } else {
        map[value] = _.get(source, key || value, null);
      }
    });

    return map;
  };
}

module.exports = Mapper;
