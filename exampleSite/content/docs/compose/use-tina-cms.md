+++
title = "Use Tina.io CMS"
description = ""
weight = 3
+++

Do you prefer managing your site using a CMS? Or would you like to make it easier for someone (a non-techie, perhaps) in your team to make edits easily? If interested, follow along. Else, skip to the [next section](../organize-content/)

Let's sync your site with Tina CMS.

## Prerequisites !!

Obviously you ought to have __a github account__. This is where your website source will live. Basically, Tina will read from github and write (commit) to your github repo.

{{< tip "warning" >}}
Gitlab or bitbucket will work too. Just check their [implementation here](https://Tina.io/docs/git-sync/gitlab/). Happy fishing.
{{< /tip >}}

### Requirement 1 : A Tina.io account

Jump over to [Tina.io](https://tina.io/) and sign up for an account. Consider signing up using your github account. That way, you don't have to deal with passwords.

### Requirement 2: A Netlify account _(optional)_

If you intend to host with something other than Netlify _e.g github pages_, please scroll on. Hosting with Netlify is a lot of fun though; I highly recommend it.

### Step 1 : Fork or Clone Compose theme

First we will fork [this theme's](https://github.com/onweru/compose) template.

### Step 2 : Add your repository in Tina CMS

{{< tip >}}
The exampleSite already comes with prefilled placeholder Tina settings. If you set up your site using [option 2](../install-theme/#option-2-recommended)

{{< /tip >}}

Edit `./static/tina/config.js` and replace tina CMS tokens with values from your own Tina account

```json
...
  clientId: "6ff9830b-b18a-4d21-b38c-cae1679e335f", // replace
  token: "2954980a0db18868974dc57a66be9ecdfe6f336b", // replace
...
search: {
  ...
    tina: {
      indexerToken: "977c145439dda036080dd7a33478d2ba385ab5af", // replace
      stopwordLanguages: ["deu", "eng", "fra", "ita", "spa", "nld"] // consider adding or removing languages https://github.com/fergiemcdowall/stopword#language-code
    },
    ...
  }
...
```

Go to your [Tina](https://tina.io/) account
