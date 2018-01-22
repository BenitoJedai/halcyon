import { SETTING_CHANGE } from '../actions/settings';
import {
  CREDENTIALS_VERIFY_SUCCESS,
  CREDENTIALS_UPDATE_SUCCESS,
} from '../actions/credentials';
import { CUSTOM_EMOJIS_FETCH_SUCCESS } from '../actions/custom_emojis';
import {
  MATCH_ACCOUNTS_FETCH_SUCCESS,
  MATCH_ACCOUNTS_DELETE,
} from '../actions/match_accounts';
import { makeGetAccount } from '../selectors';
import { INITIAL_STATE_KEY } from '../constants';

function mergeLocalStorage(key, value) {
  const prevData = JSON.parse(localStorage.getItem(key));
  const nextData = Object.assign(prevData, value);
  localStorage.setItem(key, JSON.stringify(nextData));

  return nextData;
}

function normalizeSettings(state) {
  return mergeLocalStorage(
    INITIAL_STATE_KEY,
    { settings: state.get('settings').toJS() }
  );
}

function normalizeCredentials(state, action) {
  const getAccount = makeGetAccount();
  const accountId  = action.account.id;

  return mergeLocalStorage(
    INITIAL_STATE_KEY,
    { accounts: { [accountId] : getAccount(state, accountId).toJS() } }
  );
}

function normalizeMatchAccounts(state) {
  return mergeLocalStorage(
    INITIAL_STATE_KEY,
    { match_accounts: state.get('match_accounts').filter((_, key) => key !== 'is_fetching').toJS() }
  );
}

function normalizeCustomEmojis(state, action) {
  return mergeLocalStorage(
    INITIAL_STATE_KEY,
    { custom_emojis: action.emojis }
  );
}

export default function localStorageMiddleware() {
  return ({ getState }) => next => action => {
    next(action);

    if (action.type && !action.skipLocalStorage) {
      switch(action.type) {
      case SETTING_CHANGE:
        return normalizeSettings(getState());
      case CREDENTIALS_VERIFY_SUCCESS:
      case CREDENTIALS_UPDATE_SUCCESS:
        return normalizeCredentials(getState(), action);
      case MATCH_ACCOUNTS_FETCH_SUCCESS:
      case MATCH_ACCOUNTS_DELETE:
        return normalizeMatchAccounts(getState());
      case CUSTOM_EMOJIS_FETCH_SUCCESS:
        return normalizeCustomEmojis(getState(), action);
      }
    }
  };
};
