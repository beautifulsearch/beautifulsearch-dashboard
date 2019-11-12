export const SET_INSTANCE = "SET_INSTANCE";
export const LIST_CORES = "LIST_CORES";
export const SET_CORE = "SET_CORE";


export function setInstance(instance) {
  return (dispatch) => {
    window.localStorage.setItem("instance", instance);
    dispatch({
      type: SET_INSTANCE,
      instance
    });
  }

}

export function listCores(cores) {
  return (dispatch) => {
    dispatch({
      type: LIST_CORES,
      cores
    })
  }
}

export function setCore(core) {
  return (dispatch, getState) => {
    window.localStorage.setItem("core", core);
    dispatch({
      type: SET_CORE,
      core
    })
  }
}


const defaultState = {
  instance: localStorage.getItem("instance") || "",
  cores: [],
  core: localStorage.getItem("core")
};


export default function globalReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case SET_INSTANCE:
      return { ...state, instance: action.instance };
    case LIST_CORES:
      return { ...state, cores: action.cores };
    case SET_CORE:
      return { ...state, core: action.core };
    default:
      return state;
  }
}
