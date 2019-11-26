export const SET_INSTANCE = "SET_INSTANCE";
export const LIST_CORES = "LIST_CORES";
export const SET_CORE = "SET_CORE";
export const CONNECT = "CONNECT";
export const DISCONNECT = "DISCONNECT";


export function setInstance(instance) {
  return (dispatch) => {
    window.localStorage.setItem("instance", JSON.stringify(instance));
    dispatch({
      type: SET_INSTANCE,
      instance
    });
  }
}

export function connect() {
  return({
    type: CONNECT
  });
}

export function disconnect() {
  return({
    type: DISCONNECT
  });
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
  return (dispatch) => {
    window.localStorage.setItem("core", JSON.stringify(core));
    dispatch({
      type: SET_CORE,
      core
    })
  }
}


const defaultState = {
  connected: false,
  instance: JSON.parse(window.localStorage.getItem("instance")),
  cores: [],
  core: JSON.parse(window.localStorage.getItem("core"))
};


export default function globalReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case SET_INSTANCE:
      return { ...state, instance: action.instance };
    case LIST_CORES:
      return { ...state, cores: action.cores };
    case SET_CORE:
      return { ...state, core: action.core };
    case CONNECT:
      return { ...state, connected: true };
    case DISCONNECT:
      return { ...state, connected: false };
    default:
      return state;
  }
}
