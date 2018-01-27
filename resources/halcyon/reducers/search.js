import {
  SEARCH_CHANGE,
  SEARCH_CLEAR,
  SEARCH_FETCH_SUCCESS,
  SEARCH_FETCH_REQUEST,
  SEARCH_SHOW,
} from '../actions/search';
import { STORE_HYDRATE } from '../actions/store';
import { COMPOSE_MENTION, COMPOSE_REPLY } from '../actions/compose';
import { Map as ImmutableMap, List as ImmutableList } from 'immutable';
import { RECENT_SEARCHES_MAX_LENGTH } from '../constants';

const initialState = ImmutableMap({
  value: '',
  submitted: false,
  submitting: false,
  hidden: false,
  results: ImmutableMap(),
  recent_searches: ImmutableList(),
  saved_searches: ImmutableList(),
});

function addRecentSearch(state, action) {
  return state.update('recent_searches', recent_searches => recent_searches.withMutations(list => {
    if ( !list.includes(action.value) ) {
      list.unshift(action.value);
    }

    if ( list.size > RECENT_SEARCHES_MAX_LENGTH ) {
      list.setSize(RECENT_SEARCHES_MAX_LENGTH);
    }
  }));
}

function addSavedSearch(state, action) {
  return state.update('saved_searches', saved_searches => saved_searches.withMutations(list => {
    if ( !list.includes(action.value) ) {
      list.unshift(action.value);
    }
  }));
}

function removeRecentSearch(state, action) {
  return state.update('recent_searches', recent_searches => recent_searches.withMutations(list => {
    if ( !list.get(action.index) ) {
      list.delete(action.index);
    }
  }));
}

function removeSavedSearch(state, action) {
  return state.update('saved_searches', saved_searches => saved_searches.withMutations(list => {
    if ( !list.get(action.index) ) {
      list.delete(action.index);
    }
  }));
}

const hydrate = (state, settings) => state.mergeDeep(settings);

export default function search(state = initialState, action) {
  switch(action.type) {
  case STORE_HYDRATE:
    return hydrate(state, action.state.get('search'));
  case SEARCH_CHANGE:
    return state.set('value', action.value);
  case SEARCH_CLEAR:
    return state.withMutations(map => {
      map.set('value', '');
      map.set('results', ImmutableMap());
      map.set('submitted', false);
      map.set('hidden', false);
    });
  case SEARCH_SHOW:
    return state.set('hidden', false);
  case COMPOSE_REPLY:
  case COMPOSE_MENTION:
    return state.set('hidden', true);
  case SEARCH_FETCH_REQUEST:
    return addRecentSearch(state, action);
  case SEARCH_FETCH_SUCCESS:
    return state
      .set('results', ImmutableMap({
        accounts: ImmutableList(action.results.accounts.map(item => item.id)),
        statuses: ImmutableList(action.results.statuses.map(item => item.id)),
        hashtags: ImmutableList(action.results.hashtags),
      }))
      .set('submitted', true);
  default:
    return state;
  }
};
