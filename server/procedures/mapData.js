
const rp = require('request-promise');

exports.mapData = async (sctg_string) => {
  try {
    const response = await rp(`http://localhost:4001/get-data?sctg=${sctg_string}`);
    return JSON.parse(response).data;
  } catch (e) {
    console.log(e);
  }
};


exports.getWeight = response => {
  return response.reduce((acc, item)=> {
    acc += item.W;
    return acc;
  }, 0);
};

exports.createInventory = response => {
  // make an inventory of all routes, with the weights of each
  const route_aggregator = {};
  response.forEach(r=> {
    const key = `${r.O}-${r.D}`;
    if(!route_aggregator[key]) {
      route_aggregator[key] = r.W;
    } else {
      route_aggregator[key] += r.W;
    }
  });

  const inventory = [];
  const weights = [];

  Object.keys(route_aggregator).forEach(key=> {
    const zips = key.split('-');
    inventory.push({ from: zips[0], to: zips[1] });
    weights.push(route_aggregator[key]);
  });

  return [inventory, weights];

};

exports.routePaths = inventory => {
    const options = {
      method: 'POST',
      uri: 'http://localhost:4006/route-many',
      body: inventory,
      json: true
    };
    return rp(options);
};