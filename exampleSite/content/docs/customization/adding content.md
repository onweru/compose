---
title: "Adding Content"
weight: 4
description: >
  Add different types of content to your Docsy site.
---

So you've got a new Hugo website with Docsy, now it's time to add some content! This page tells you how to use the theme to add and structure your site content. 

## Content root directory

You add content for your site under the **content root directory** of your Hugo site project - either `content/` or a [language-specific](/docs/language/) root like `content/en/`. The main exception here is static files that you don't want built into your site: you can find out more about where you add these below in [Adding static content](#adding-static-content). The files in your content root directory are typically grouped in subdirectories corresponding to your site's sections and templates, which we'll look at in [Content sections and templates](#content-sections-and-templates).

You can find out more about Hugo directory structure in [Directory Structure Explained](https://gohugo.io/getting-started/directory-structure/#directory-structure-explained).

### Custom sections

If you've copied the example site and *don't* want to use one of the provided content sections, just delete the appropriate content subdirectory. Similarly, if you want to add a top-level section, just add a new subdirectory, though you'll need to specify the layout or content type explicitly in the [frontmatter](#page-frontmatter) of each page if you want to use any existing Docsy template other than the default one. For example, if you create a new directory `content/en/amazing` and want one or more pages in that custom section to use Docsy's `docs` template, you add `layout: docs` to the frontmatter of each page:

```yaml
---
title: "My amazing new section"
weight: 1
layout: docs
description: >
  A special section with a docs layout.
---
```

Alternatively, create your own page template for your new section in your project's `layouts` directory based on one of the existing templates.

You can find out much more about how Hugo page layouts work in [Hugo Templates](https://gohugo.io/templates/). The rest of this page tells you about how to add content and use each of Docsy's templates.

## Page frontmatter

Each page file in a Hugo site has metadata frontmatter that tells Hugo about the page. You specify page frontmatter in TOML, YAML, or JSON (our example site and this site use YAML). Use the frontmatter to specify the page title, description, creation date, link title, template, menu weighting, and even any resources such as images used by the page. You can see a complete list of possible page frontmatter in [Front Matter](https://gohugo.io/content-management/front-matter/).

For example, here's the frontmatter for this page:

```
---
title: "Adding Content"
linkTitle: "Adding Content"
weight: 1
description: >
  How to add content to your Docsy site.
---
```

The minimum frontmatter you need to provide is a title: everything else is up to you! (though if you leave out the page weight your [navigation](/docs/adding-content/navigation) may get a little disorganized).


## Page contents and markup

By default you create pages in a Docsy site as simple [Markdown or HTML files](https://gohugo.io/content-management/formats/) with [page frontmatter](#page-frontmatter), as described above. Versions of Hugo before 0.60 use [BlackFriday](https://github.com/russross/blackfriday) as its Markdown parser. From 0.60, Hugo uses [Goldmark](https://github.com/yuin/goldmark/) as its Markdown parser by default.

{{% alert title="Tip" %}}
If you've been using earlier versions of Hugo, you may need to make some small changes to your site to work with the current Markdown parser. In particular, if you cloned an earlier version of our example site, add the following to your `config.toml` to allow Goldmark to render raw HTML as well as Markdown:

```toml
[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true
```

Alternatively, if you want to continue using Blackfriday, you can follow the instructions in the [Hugo documentation](https://gohugo.io/getting-started/configuration-markup#blackfriday) to change the Markdown parser.
{{% /alert %}}

In addition to your marked-up text, you can also use Hugo and Docsy's [shortcodes](/docs/adding-content/shortcodes): reusable chunks of HTML that you can use to quickly build your pages. Find out more about shortcodes in [Docsy Shortcodes](/docs/adding-content/shortcodes).

{{% alert title="Note" color="info" %}}
Hugo also supports adding content using other markups using [external parsers as helpers](https://gohugo.io/content-management/formats/#additional-formats-through-external-helpers). For example, you can add content in RST using `rst2html` as an external parser (though be aware this does not support all flavors of RST, such as Sphinx RST). Similarly, you can use `asciidoctor` to parse Asciidoc files, or `pandoc` for other formats.

External parsers may not be suitable for use with all deployment options, as you'll need to install the external parser and run Hugo yourself to generate your site (so, for example, you won't be able to use [Netlify's continuous deployment feature](/docs/deployment/#deployment-with-netlify)). In addition, adding an external parser may cause performance issues building larger sites.
{{% /alert %}}

### Working with links

Hugo lets you specify links using normal Markdown syntax, though remember that you need to specify links relative to your site's root URL, and that relative URLs are left unchanged by Hugo in your site's generated HTML.

Alternatively you can use Hugo's helper [`ref` and `relref` shortcodes](https://gohugo.io/content-management/cross-references/) for creating internal links that resolve to the correct URL. However, be aware this means your links will not appear as links at all if a user views your page outside your generated site, for example using the rendered Markdown feature in GitHub's web UI.

You can find (or add!) tips and gotchas for working with Hugo links in [Hugo Tips](/docs/best-practices/site-guidance).

### Content style

We don't mandate any particular style for your page contents. However, if you'd like some guidance on how to write and format clear, concise technical documentation, we recommend the [Google Developer Documentation Style Guide](https://developers.google.com/style/), particularly the [Style Guide Highlights](https://developers.google.com/style/highlights).

## Page bundles

You can create site pages as standalone files in their section or subsection directory, or as folders where the content is in the folder's index page. Creating a folder for your page lets you [bundle](https://gohugo.io/content-management/page-bundles/) images and other resources together with the content. 


You can find out much more about managing resources with Hugo bundles in [Page Bundles](https://gohugo.io/content-management/page-bundles/).

### Organizing your documentation

While Docsy's top-level sections let you create site sections for different types of content, you may also want to organize your docs content within your `docs` section. For example, this site's `docs` section directory has multiple subdirectories for **Getting Started**, **Content and Customization**, and so on. Each subdirectory has an `_index.md` (it could also be an `_index.html`), which acts as a section index page and tells Hugo that the relevant directory is a subsection of your docs.

#### Docs section landing pages

By default a docs section landing page (the `_index.md` or `_index.html` in the section directory) uses a layout that adds a formatted list of links to the pages in the section, with their frontmatter descriptions. The [Content and Customization](/docs/adding-content/) landing page in this site is a good example.

To display a simple bulleted list of links to the section's pages instead, specify `simple_list: true` in the landing page's frontmatter:

```
---
title: "Simple List Page"
simple_list: true
weight: 20
---
```

To display no links at all, specify `no_list: true` in the landing page's frontmatter:

```
---
title: "No List Page"
no_list: true
weight: 20
---
```

### Building your own landing pages

If you've just used the theme, you can still use all Docsy's provided [page blocks](/docs/adding-content/shortcodes)  (or any other content you want) to build your own landing pages in the same file locations.
