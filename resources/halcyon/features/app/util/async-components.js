export function EmojiPicker () {
  return import(/* webpackChunkName: "features/emoji_picker" */'../../emoji/emoji_picker');
}

export function HomeTimeline () {
  return import(/* webpackChunkName: "features/home_timeline" */'../../home_timeline');
}

export function PublicTimeline () {
  return import(/* webpackChunkName: "features/public_timeline" */'../../public_timeline');
}

export function CommunityTimeline () {
  return import(/* webpackChunkName: "features/community_timeline" */'../../community_timeline');
}

export function ListTimeline () {
  return import(/* webpackChunkName: "features/list_timeline" */'../../list_timeline');
}

export function Lists () {
  return import(/* webpackChunkName: "features/lists" */'../../lists');
}

export function Account () {
  return import(/* webpackChunkName: "features/account" */'../../account');
}

export function Search () {
  return import(/* webpackChunkName: "features/search" */'../../search');
}

export function Share () {
  return import(/* webpackChunkName: "features/share" */'../../share');
}

export function Login () {
  return import(/* webpackChunkName: "features/login" */'../../login');
}

export function NotFound () {
  return import(/* webpackChunkName: "features/not_found" */'../../not_found');
}
