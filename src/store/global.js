import { dispatch } from "rxjs/internal/observable/pairs";

export const SET_INSTANCE = "SET_INSTANCE";
export const LIST_CORES = "LIST_CORES";
export const SET_CORE = "SET_CORE";


export function setInstance(instance) {
  return {
    type: SET_INSTANCE,
    instance
  };
}

export function listCores(cores) {
  return (dispatch, getState) => {
    dispatch({
      type: LIST_CORES,
      cores
    })
  }
}

export function setCore(core) {
  return (dispatch, getState) => {
    const instance = getState().global.instance;
    instance && window.localStorage.setItem("instance", instance);
    core && window.localStorage.setItem("core", core);

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
