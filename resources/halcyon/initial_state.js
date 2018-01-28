import { INITIAL_STATE_KEY } from './constants';

const storage = localStorage.getItem(INITIAL_STATE_KEY);
const initialState = storage && JSON.parse(storage);
const getMeta    = (prop) => initialState && initialState.meta && initialState.meta[prop];
const getSetting = (prop) => initialState && initialState.settings && initialState.settings[prop];

export const unfollowModal = getSetting('unfollowModal');
export const boostModal    = getSetting('boostModal');
export const deleteModal   = getSetting('deleteModal');
export const autoPlayGif   = getSetting('autoPlayGif');
export const reduceMotion  = getSetting('reduceMotion');

export const domain        = getMeta('domain');
export const me            = getMeta('me');

export default initialState;
