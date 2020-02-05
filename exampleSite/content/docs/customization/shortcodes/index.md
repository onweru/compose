---
title: "Shortcodes"
weight: 7
description: >
  Use hugo shortcodes to quickly compose site pages.
resources:
- src: "**spruce*.jpg"
  params:
    byline: "Photo: Bjørn Erik Pedersen / CC-BY-SA"
---

Rather than writing all your site pages from scratch, Hugo lets you define and use [shortcodes](https://gohugo.io/content-management/shortcodes/). These are reusable snippets of content that you can include in your pages, often using HTML to create effects that are difficult or impossible to do in simple Markdown. Shortcodes can also have parameters that let you, for example, add your own text to a fancy shortcode text box. As well as Hugo's [built-in shortcodes](https://gohugo.io/content-management/shortcodes/), Compose provides some shortcodes of its own to help you build your pages.

Why shortcodes? While markdown is sufficient to produce simple pages, it's insufficient where complex page structures are needed. Thusly, whenever we need special styling, shortcodes compliment the shortcomings of markdown.

Shortcodes use either `` or `` as the *opening tags*. The former are used if the immediate content is markdown, while the latter is used whenever the immediate content is something else. 

Sometimes, the shortcode will wrap content, sometimes it won't. When content is wrapped, a closing shortcode tag is needed. Please see the link I provided above and the markdown files for examples. You'll get the gist pretty quickly.

I've setup the following shortcodes:

### Block 

Takes positional modifiers

**Example**
```markdown
...
  {{</* block "modifiers" */>}}
  <!-- Nest columns or content  -->
  {{</* /block */>}}
...
```

### Column

It takes positional parameters

**Example**
```markdown
  {{</* column "mt-2 mb-2" */>}}
  <!-- applied margin top and margin bottom modifiers -->
  {{</* /column */>}}
```

### Video

This allows you to embed a youtube video in you content. You would achieve that using a positional parameter (needs no name )parameter, like so:

**Example:**

```markdown
  {{</* youtube "xWF59rWSceA" */>}}
  <!-- Use the youtube video id -->
```

### Button

This adds a styled link (styled like a button). It takes two no-optional parameters:

| PARAMETER | PURPOSE | OPTIONAL |
| :---  | :--- | :--- |
| label | button text | no |
| url | button link | no |

**Example**

```
  {{</* button url="/" label="doe nu mee" */>}}
```
