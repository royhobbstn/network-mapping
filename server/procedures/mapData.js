
const rp = require('request-promise');

exports.mapData = async (naics_string) => {
  try {
    const response = await rp(`http://localhost:4001/get-data?naics=${naics_string}`);
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
  return route_aggregator;
};

exports.routePaths = async inventory => {
  try {
    const options = {
      method: 'POST',
      uri: 'http://localhost:4006/route-data',
      body: inventory,
      json: true
    };
    const response = await rp(options);
    return JSON.parse(response);
  } catch (e) {
    console.log(e);
  }
};