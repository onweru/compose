# Compose

Compose is a [Hugo](https://gohugo.io/) theme for documentation websites, inspired by [forestry.io](forestry.io)'s docs page. The theme provides a simple navigation & structure.

![Hugo Compose Theme](https://github.com/onweru/compose/blob/master/images/screenshot.png)

## Installation 

Install a recent release of the Hugo "extended" version; ideally versions `>= 0.61.0`. If you install from [hugo releases page](https://github.com/gohugoio/hugo/releases),  download the `_extended` version, which supports sass.

## Example 

You can find an example project that uses Compose in the [Compose Userguide](https://github.com/onweru/compose-userguide). 

The Compose Example Project is hosted at [https://compose-docs.netlify.com](https://compose-docs.netlify.com). This project also stands as the theme's user guide.

> This guide covers the necessary bits. As the project evolves, the userguide will get more comprehensive

You can use Hugo to generate and serve a local copy of the guide (also useful for testing local theme changes), making sure you have installed all the prerequisites listed above:

```
git clone --recurse-submodules --depth 1 https://github.com/onweru/compose.git
cd compose/exampleSite/
hugo server --themesDir ../..
```

Note that you need the `themesDir` flag when running Hugo because the site files are inside the theme repo.

## From the same creator

1. [Swift Theme](https://github.com/onweru/hugo-swift-theme)
2. [Newsroom Theme](https://github.com/onweru/newsroom)

## License

This theme is available under the [MIT license](https://github.com/onweru/compose/blob/master/LICENSE.md).
