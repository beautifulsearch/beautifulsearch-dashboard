export const SET_INSTANCE = "SET_INSTANCE";
export const LIST_CORES = "LIST_CORES";
export const SET_CORE = "SET_CORE";
export const CONNECT = "CONNECT";
export const DISCONNECT = "DISCONNECT";
export const SET_CREATE_STORE_STATUS = "SET_CREATE_STORE_STATUS";
export const SET_DOCUMENT_STATUS = "SET_DOCUMENT_STATUS";
export const SLIDE_PANEL_STATUS_ACTIVE = "SLIDE_PANEL_STATUS_ACTIVE";
export const SLIDE_PANEL_STATUS_DEACTIVE = "SLIDE_PANEL_STATUS_DEACTIVE";


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

export function setCreateStoreStatus() {
  return (dispatch) => {
    dispatch({
      type: SET_CREATE_STORE_STATUS
    })
  }
}

export function setAddDocumentStatus() {
  return (dispatch) => {
    dispatch({
      type: SET_DOCUMENT_STATUS
    })
  }
}

export function toggleSlidePanelActive() {
  return (dispatch) => {
    dispatch({
      type: SLIDE_PANEL_STATUS_ACTIVE
    })
  }
}

export function toggleSlidePanelDeactive() {
  return (dispatch) => {
    dispatch({
      type: SLIDE_PANEL_STATUS_DEACTIVE
    })
  }
}

const defaultState = {
  connected: false,
  instance: JSON.parse(window.localStorage.getItem("instance")),
  cores: [],
  core: JSON.parse(window.localStorage.getItem("core")),
  slidePanelStatus: false,
  createCoreStatus: false,
  addDocumentStatus: false
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
    case SET_CREATE_STORE_STATUS:
      return { ...state, createCoreStatus: true };
    case SET_DOCUMENT_STATUS:
      return { ...state, addDocumentStatus: true };
    case SLIDE_PANEL_STATUS_ACTIVE:
      return { ...state, slidePanelStatus: true };
    case SLIDE_PANEL_STATUS_DEACTIVE:
      return { ...state, slidePanelStatus: false };
    default:
      return state;
  }
}
