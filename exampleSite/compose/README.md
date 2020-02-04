# Compose

Compose is a [Hugo](https://gohugo.io/) theme for documentation sites, that provide simple navigation & structure.

## Prerequisites

The following are basic prerequisites for using compose in your site:

- Install a recent release of the Hugo "extended" version (we recommend version 0.53 or later). If you install from the 
  [release page](https://github.com/gohugoio/hugo/releases), make sure you download the `_extended` version 
  which supports sass.

## Example and usage

You can find an example project that uses Compose in the [Compose Example Project repo](https://github.com/onweru/compose). The Compose Example Project is hosted at [https://example.Compose.dev/](https://example.Compose.dev/).

To use the Compose theme for your own site:

  - (Recommended) Copy the [example project](https://github.com/onweru/compose), which includes the Compose theme as a submodule.
    You can customize this pre-configured basic site into your own Compose themed site. [Learn more...](https://github.com/onweru/compose)
  
  - Add Compose to your existing Hugo site repo's `themes` directory. You can either add Compose as a Git submodule, or clone the Compose theme into your project.

See the [Compose Getting Started Guide](https://Compose.dev/docs/getting-started/) for details about the various usage options.

## Documentation

Compose has its own user guide (using Compose, of course!) with lots more information about using the theme, which you can find at [https://Compose.dev/](https://Compose.dev/). Alternatively you can use Hugo to generate and serve a local copy of the guide (also useful for testing local theme changes), making sure you have installed all the prerequisites listed above:

```
git clone --recurse-submodules --depth 1 https://github.com/onweru/compose.git
cd compose/userguide/
hugo server --themesDir ../..
```

Note that you need the `themesDir` flag when running Hugo because the site files are inside the theme repo.
