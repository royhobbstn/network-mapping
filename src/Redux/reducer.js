// reducer

const default_state = {
  selected_sctg: ""
};

const map = (
  state = default_state,
  action
) => {
  switch (action.type) {
    case 'UPDATE_SCTG':
      return Object.assign({}, state, { selected_sctg: action.selection });
    default:
      return state;
  }
};

export default map;
