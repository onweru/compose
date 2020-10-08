---
title: Getting started
weight: 11
---

## Prerequisites

Firstly, __ensure you have installed the [extended version of Hugo](https://github.com/gohugoio/hugo/releases)__. See installation steps from [Hugo's official docs](https://gohugo.io/getting-started/installing/).

## Getting up and running

Read the [prerequisites](#prerequisites) above and verify you're using the extended version of Hugo. There are at least two ways of quickly getting started with Hugo and the VMware Clarity theme:

### Option 1 (recommended)

Generate a new Hugo site and add this theme as a Git submodule inside your themes folder:

```bash
hugo new site yourSiteName
cd yourSiteName
git init
git submodule add https://github.com/chipzoller/hugo-clarity themes/hugo-clarity
cp -a themes/hugo-clarity/exampleSite/* .
```

Then run

```bash
hugo server
```

Hurray!

### Option 2 (Great for testing quickly)

You can run your site directly from the `exampleSite`. To do so, use the following commands:

```bash
git clone https://github.com/chipzoller/hugo-clarity
cd hugo-clarity/exampleSite/
hugo server --themesDir ../..
```

> Although, option 2 is great for quick testing, it is somewhat problematic when you want to update your theme. You would need to be careful not to overwrite your changes.

### Option 3 (The new, most fun & painless approach)

This option enables you to load this theme as a hugo module. It arguably requires the least effort to run and maintain in your website.

```bash
git clone https://github.com/chipzoller/hugo-clarity.git clarity
cd clarity/exampleSite/
hugo mod init my-site
```
Open config.toml file in your code editor, replace `theme = "hugo-clarity"` with `theme = ["github.com/chipzoller/hugo-clarity"]` or just `theme = "github.com/chipzoller/hugo-clarity"`.

Hurray you can now run

```yaml
hugo server
```

> There's one drawback to this technique. Your site will always use the most up-to-date version of the theme. This might break your site if there are substantial / breaking changes that you don't like.

You can work around this forking the repo instead and following the same approach. Be sure the edit `theme = ["github.com/chipzoller/hugo-clarity"]` from the config.toml file to `theme = ["github.com/yourUsername/hugo-clarity"]`.

> There [is more you could do with hugo modules](https://discourse.gohugo.io/t/hugo-modules-for-dummies/20758), but this will suffice for our use case here.
