# Compose

Compose is a [Hugo](https://gohugo.io/) theme for documentation sites, that provide simple navigation & structure.

## Prerequisites

The following are basic prerequisites for using compose in your site:

- Install a recent release of the Hugo "extended" version (we recommend version 0.61 or later). If you install from the 
  [release page](https://github.com/gohugoio/hugo/releases), make sure you download the `_extended` version 
  which supports sass.

## Example and usage

You can find an example project that uses Compose in the [Compose Example Project repo](https://github.com/onweru/compose). The Compose Example Project is hosted at [https://example.Compose.dev/](https://example.Compose.dev/).


## Documentation

Compose has its own user guide (using Compose, of course!) with lots more information about using the theme, which you can find at [https://compose-docs.netlify.com](https://compose-docs.netlify.com). Alternatively you can use Hugo to generate and serve a local copy of the guide (also useful for testing local theme changes), making sure you have installed all the prerequisites listed above:

```
git clone --recurse-submodules --depth 1 https://github.com/onweru/compose.git
cd compose/exampleSite/
hugo server --themesDir ../..
```

Note that you need the `themesDir` flag when running Hugo because the site files are inside the theme repo.
