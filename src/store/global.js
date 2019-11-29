export const SET_INSTANCE = "SET_INSTANCE";
export const LIST_CORES = "LIST_CORES";
export const SET_CORE = "SET_CORE";
export const CONNECT = "CONNECT";
export const DISCONNECT = "DISCONNECT";
export const SET_ONBOARDING_DETAILS = "SET_ONBOARDING_DETAILS";
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

export function setOnboardingDetails(onboardingDetails={}) {
  return (dispatch) => {
    dispatch({
      type: SET_ONBOARDING_DETAILS,
      onboardingDetails
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
    case SET_ONBOARDING_DETAILS:
      return { ...state, onboarding: { ...state.onboarding, ...action.onboardingDetails } };
    case TOGGLE_SLIDE_PANEL:
      return { ...state, slidePanelStatus: !state.slidePanelStatus };
    default:
      return state;
  }
}
