# Compose

Compose is a [Hugo](https://gohugo.io/) theme for documentation websites, inspired by [forestry.io](https://forestry.io/docs/welcome/)'s docs page. The theme provides a simple navigation & structure.

![Hugo Compose Theme](https://github.com/onweru/compose/blob/master/images/screenshot.png)

## Features

1. Docs
2. Gallery Support (via shortcode)
3. Native lazy loading of images
4. Live search

## Installation

Install a recent release of the Hugo "extended" version; ideally versions `>= 0.76.0`. If you install from [hugo releases page](https://github.com/gohugoio/hugo/releases),  __download the `_extended`__ version, which supports sass.

## Run your site with compose theme

You could go with the options right below.

### Option 1 (my favorite)

This option enables you to load compose theme as a hugo module.

```bash
git clone https://github.com/onweru/compose.git
cd compose/exampleSite/
hugo server
```

> There's one drawback to this technique. Your site would always use the most up-to-date version of the theme. This might break your site if there are drastic changes that you don't like.

You can overcome that drawback by forking the repo instead and following the same approach. Be sure the edit the `theme = ["github.com/onweru/compose"]` from the config.toml file appropriately.

> ⚠️ If you choose __Option 2__ or __Option 3__ below, ensure you edit [these lines in the config.toml file](https://github.com/onweru/compose/blob/b3e30e0816621223224897edc45eeeabd0d9cd16/exampleSite/config.toml#L4-L7) as advised on the comments

### Option 2 (recommended)

Generate a new Hugo site and add this theme as a Git submodule inside your themes folder:

```bash
hugo new site yourSiteName
cd yourSiteName
git init
git submodule add https://github.com/onweru/compose.git themes/compose
cp -a themes/compose/exampleSite/* .
```

Then run

```bash
hugo server
```

Hurray!

### Option 3 (Great for testing quickly)

You can run your site directly from the `exampleSite`. To do so, use the following commands:

```bash
git clone https://github.com/onweru/compose.git
cd compose/exampleSite/
hugo server --themesDir ../..
```

> Although, option 3 is great for quick testing, it is somewhat problematic when you want to update your theme. You would need to be careful not to overwrite your changes.

Once set, jump over to the `config.toml` file and start [configuring](#configuration) your site.

## ExampleSite

The [exampleSite](https://github.com/onweru/compose/tree/master/exampleSite) serves as this theme's user guide (documentation). Please go through [compose docs](https://docs.neuralvibes.com/docs/compose/getting-started/)

> This guide covers the necessary bits. As the project evolves, the userguide will get more comprehensive

You can use Hugo to generate and serve a local copy of the guide (also useful for testing local theme changes), making sure you have installed all the prerequisites listed above:

```
git clone --recurse-submodules --depth 1 https://github.com/onweru/compose.git
cd compose/exampleSite/
hugo server --themesDir ../..
```

Note that you need the `themesDir` flag when running Hugo because the site files are inside the theme repo.

### How do I disable dark mode?

Under `params` add `enableDarkMode = false` to your `config.toml` file. If your site is based on the exampleSite, the value is already included; you only need to uncomment it.

> The user will still have the option to activate dark mode, if they so wish

## From the same creator

1. [Clarity Theme](https://github.com/chipzoller/hugo-clarity)
2. [Newsroom Theme](https://github.com/onweru/newsroom)
3. [Swift Theme](https://github.com/onweru/hugo-swift-theme)

## License

This theme is available under the [MIT license](https://github.com/onweru/compose/blob/master/LICENSE).
