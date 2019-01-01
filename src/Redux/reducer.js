// reducer

const default_state = {

};

const map = (
  state = default_state,
  action
) => {
  switch (action.type) {
    // case 'UPDATE_ZOOM_MESSAGE':
    //   return Object.assign({}, state, { map_zoom: action.zoom });
    default:
      return state;
  }
};

export default map;
