export const RECENT_SEARCHES_MAX_LENGTH = 4;
export const DEFAULT_STATUS_MAX_LENGTH = 500;
export const ERROR_MESSAGE_INTERVAL = 5000;
export const INITIAL_STATE_KEY = 'initial_state';

export const VINAYAKA_ENDPOINT = 'https://vinayaka.halcyon.social';

export const INFORMATION_MASTODON = 'https://joinmastodon.org';
export const INFORMATION_SOURCE_CODE = 'https://github.com/halcyon-suite/halcyon';
export const INFORMATION_FEEDBACK = 'https://github.com/halcyon-suite/halcyon/issues';
export const INFORMATION_DONATION = 'https://www.patreon.com/neetshin';

export const LANUAGES = [
  { value: 'en', name: 'English' },
  { value: 'ja', name: '日本語' },
];

export const THEMES = [
  { value: '/theme_dark.css',  name: 'Dark' },
  { value: '/theme_light.css', name: 'Light' },
];

export const DEFAULT_INITIAL_STATE = {
  meta: {
  },

  compose: {
    me: '76721',
    default_privacy: 'public',
    default_sensitive: false,
  },

  accounts: {},

  custom_emojis: [],

  settings: {
    skinTone: 1,

    unfollowModal: false,
    boostModal: false,
    deleteModal: true,
    autoPlayGif: true,
    reduceMotion: false,

    home: {
      shows: {
        reblog: true,
        reply: true,
      },
      regex: {
        body: '',
      },
    },
    community: {
      regex: {
        body: '',
      },
    },
    public: {
      regex: {
        body: '',
      },
    },

    halcyon: {
      roundAvatars: true,
      showNavigationLabels: false,
      acctNormalizing: 'remote_only',
    },
  },

  match_accounts: {},
};
