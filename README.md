# Compose

Compose is a [Hugo](https://gohugo.io/) theme for documentation websites, inspired by [forestry.io](https://forestry.io/docs/welcome/)'s docs page. The theme provides a simple navigation & structure.

![Hugo Compose Theme](https://github.com/onweru/compose/blob/master/images/tn.png)

## Features

1. Documentation
2. Gallery Support (via shortcode)
3. Native lazy loading of images
4. Live search
5. Pie, doughnut & bar charts support
6. Searchable & Sortable tables
7. Syntax highlighting

## Run your site with compose theme

- [Install compose theme](https://docs.neuralvibes.com/docs/compose/install-theme/)
- [Use forestry](https://docs.neuralvibes.com/docs/compose/use-forestry-cms/)
- [Customize your site](https://docs.neuralvibes.com/docs/compose/customize/)

## ExampleSite

The [exampleSite](https://github.com/onweru/compose/tree/master/exampleSite) serves as this theme's [user guide]((https://docs.neuralvibes.com/docs/compose/getting-started/)) .

> This guide covers the necessary bits. As the project evolves, the userguide will get more comprehensive

You can use Hugo to generate and serve a local copy of the guide (also useful for testing local theme changes).

```
git clone --recurse-submodules --depth 1 https://github.com/onweru/compose.git
cd compose/exampleSite/
hugo server --themesDir ../..
```

Note that you need the `themesDir` flag when running Hugo because the site files are inside the theme repo.

## From the same creator

1. [Clarity Theme](https://github.com/chipzoller/hugo-clarity)
2. [Newsroom Theme](https://github.com/onweru/newsroom)
3. [Swift Theme](https://github.com/onweru/hugo-swift-theme)

## License

This theme is available under the [MIT license](https://github.com/onweru/compose/blob/master/LICENSE).
