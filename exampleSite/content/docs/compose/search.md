+++
description = ""
title = "Search Function"
weight = 7
+++

Firstly, ensure you have these lines inside your hugo.toml file

```toml
[outputs]
   home = ["HTML", "RSS","JSON"]
```

Compose implements [Fuse js](https://fusejs.io/) or [Algolia](https://www.algolia.com/doc/rest-api/search/) to enable search functionality. By default Fuse is applied. Algolia can be enabled by adding this settings to `config/_default/params.toml` file

```toml
# search
[search]
on = true
global = false
[search.algolia]
enable = false # if false search will default to fusejs
id = "Q40WQQX84U" # Application ID
index = "compose" # Index name
key = "da87401a458102ec6bbd6cc5e5cf8d95" # Search-Only API Key
```

Both search engines will display results using the same UI. By choosing the default (.ie fuse js),  you will be opting for local search. This way, no additional setup is needed.

Algolia will require you to build and host your index. For those using Github, this theme ships with an [algolia github action](/docs/compose/github-actions/#algolia-ci).

By default, search will return results from the current content section. Searches from the top level section e.g the homepage, will return global results. This way, the results are scoped. You can override this behaviour using this setting

```toml
...
[search]
...
global = false # turn to `true` to enable global search
...
```

At the time of this writing, search on these theme takes either of this forms:

### 1. Passive search

This occurs only when the user loads the search page i.e `/search/`. They can directly navigate to that url. Alternatively, the user can type you search query on the search field and click enter. They will be redirected to the search page which will contain matched results if any.

### 2. Live search

This behaviour will be obvious as the user types a search query on the search field. All `valid search queries`, will yield a list of `quick links` or a simple `no matches found`. Else, the user will be prompted to continue typing.

> Please note that the results under quick links will be a truncated list of the most relevant results. Only a maximum of 8 items will be returned. This number is pragmatic at best if not arbitrary. On the search page, the number is set to 12.

Note that live search on the search page will behave differently than on the other pages. Nonetheles, the pages apply the same live search principle.

> Hitting enter while typing on the search page will be moot as that page’s content will live update as you type in the search word / phrase.

### Customize search feedback labels

Use the `i18n` files to do so.

### What is a valid search query

A valid search query must be long enough. If the search query can be cast as a float, then it only need contain one or more characters.

Else the search query must be at least 2 characters long.

<!-- This behaviour will change. -->