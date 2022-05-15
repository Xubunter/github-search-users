import { Number, String, Record, Static } from "runtypes";

export const User = Record({
  avatar_url: String.nullable(),
  bio: String.nullable(),
  blog: String.nullable(),
  company: String.nullable(),
  email: String.nullable(),
  followers: Number,
  following: Number,
  html_url: String,
  id: Number,
  login: String,
  name: String.nullable(),
  public_gists: Number,
  public_repos: Number,
  repos_url: String,
  twitter_username: String.nullable(),
});

export type User = Static<typeof User>;

// avatar_url: "https://avatars.githubusercontent.com/u/9039513?v=4"
// bio: "https://gitlab.com/Xubunter"
// blog: "xubunter.github.io"
// company: null
// created_at: "2014-10-06T17:10:40Z"
// email: "xubunter@gmail.com"
// events_url: "https://api.github.com/users/Xubunter/events{/privacy}"
// followers: 0
// followers_url: "https://api.github.com/users/Xubunter/followers"
// following: 0
// following_url: "https://api.github.com/users/Xubunter/following{/other_user}"
// gists_url: "https://api.github.com/users/Xubunter/gists{/gist_id}"
// gravatar_id: ""
// hireable: null
// html_url: "https://github.com/Xubunter"
// id: 9039513
// location: null
// login: "Xubunter"
// name: null
// node_id: "MDQ6VXNlcjkwMzk1MTM="
// organizations_url: "https://api.github.com/users/Xubunter/orgs"
// public_gists: 0
// public_repos: 18
// received_events_url: "https://api.github.com/users/Xubunter/received_events"
// repos_url: "https://api.github.com/users/Xubunter/repos"
// site_admin: false
// starred_url: "https://api.github.com/users/Xubunter/starred{/owner}{/repo}"
// subscriptions_url: "https://api.github.com/users/Xubunter/subscriptions"
// twitter_username: null
// type: "User"
// updated_at: "2022-04-22T12:48:26Z"
// url: "https://api.github.com/users/Xubunter"
