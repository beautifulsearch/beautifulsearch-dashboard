import Solr from "../services/solr";

export const SET_INSTANCE = "SET_INSTANCE";
export const LIST_CORES = "LIST_CORES";
export const SET_CORE = "SET_CORE";
export const CONNECT = "CONNECT";
export const DISCONNECT = "DISCONNECT";
export const SET_ONBOARDING = "SET_ONBOARDING";
export const FETCH_ONBOARDING = "FETCH_ONBOARDING";
export const TOGGLE_SLIDE_PANEL = "TOGGLE_SLIDE_PANEL";


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

export function setOnboarding(onboarding={}) {
  return async (dispatch, getState) => {
    const { instance, core } = getState();
    const solr = new Solr(instance, core);
    await solr.setConfiguration({ onboarding });
    dispatch({
      type: SET_ONBOARDING,
      onboarding
    });
  }
}

export function fetchOnboarding() {
  return async (dispatch, getState) => {
    const { global } = getState();
    const { instance, core } = global;
    const solr = new Solr(instance, core);
    const { data } = await solr.getConfiguration('onboarding');
    dispatch({
      type: FETCH_ONBOARDING,
      onboarding: data.onboarding
    });
  }
}

export function toggleSlidePanel() {
  return dispatch => {
    dispatch({
      type: TOGGLE_SLIDE_PANEL
    });
  };
}


const defaultState = {
  connected: false,
  instance: JSON.parse(window.localStorage.getItem("instance")),
  cores: [],
  core: JSON.parse(window.localStorage.getItem("core")),
  slidePanelStatus: false,
  createCoreStatus: false,
  addDocumentStatus: false,
  onboarding: {
    coreCreated: false,
    documentImported: false
  }
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
    case FETCH_ONBOARDING:
      return { ...state, onboarding: { ...state.onboarding, ...action.onboarding } };
    case SET_ONBOARDING:
      return { ...state, onboarding: { ...state.onboarding, ...action.onboarding } };
    case TOGGLE_SLIDE_PANEL:
      return { ...state, slidePanelStatus: !state.slidePanelStatus };
    default:
      return state;
  }
}
