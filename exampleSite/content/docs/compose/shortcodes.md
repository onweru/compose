+++
description = "Use hugo shortcodes to quickly compose your documentation pages."
title = "Shortcodes"
weight = 5

+++
Instead of writing all your site pages from scratch, Hugo lets you define and use [shortcodes](https://gohugo.io/content-management/shortcodes/).

Why shortcodes? While markdown is sufficient to produce simple pages, it's insufficient where complex page structures are needed. Thusly, whenever we need special styling, shortcodes compliment the shortcomings of markdown.

This way, you can side step complex html and css boilerplate in your content files.

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

### Youtube Video

This allows you to embed a youtube video in you content. You would achieve that using a positional parameter (needs no name )parameter, like so:

**Syntax**

```markdown
  {{</* youtube "25QyCxVkXwQ" */>}}
  <!-- Use the youtube video id -->
```

**Result**

{{< youtube "25QyCxVkXwQ" >}}

**OR**

**Syntax**

```markdown
<!-- or use full url -->
{{</* youtube "https://www.youtube.com/watch?v=MmG2ah5Df4g" */>}}
```

**Result**

{{< youtube "https://www.youtube.com/watch?v=MmG2ah5Df4g" >}}

#### Lite YouTube

The `liteyoutube` shortcode supports three parameters:

| PARAMETER | PURPOSE | OPTIONAL |
| :--- | :--- | :--- |
| videoid | YouTube video identifier | no |
| params | YouTube parameters | yes |
| img | Background image from static/images | yes |

##### With no Parameters

This example shows only supplying the required `videoid` (without a named parameter). You can also add the `img` and `params` parameters (in that order) without using named parameters.

```markdown
{{</* liteyoutube "MmG2ah5Df4g" */>}}
```

{{< liteyoutube "MmG2ah5Df4g" >}}

##### With `videoid` and `params`

The params string instructs YouTube to play only 20 seconds of the video starting at ten seconds and ending at 30 seconds. It also disables the player controls and enables the YouTube `JSAPI`.

```markdown
{{</* liteyoutube videoid="MmG2ah5Df4g" params="controls=0&start=10&end=30&modestbranding=2&rel=0&enablejsapi=1" */>}}
```

{{< liteyoutube videoid="MmG2ah5Df4g" params="controls=0&start=10&end=30&modestbranding=2&rel=0&enablejsapi=1" >}}

##### With All Three Positional Parameters

```markdown
{{</* liteyoutube "MmG2ah5Df4g" "painting.jpg" "controls=0&start=10&end=30&modestbranding=2&rel=0&enablejsapi=1" */>}}
```

{{< liteyoutube "MmG2ah5Df4g" "painting.jpg" "controls=0&start=10&end=30&modestbranding=2&rel=0&enablejsapi=1" >}}

{{< tip >}}
You can browse the full list of YouTube parameters [here](https://developers.google.com/youtube/player_parameters#Parameters)
{{< /tip >}}

### Button

This adds a styled link (styled like a button). It takes two no-optional parameters:

| PARAMETER | PURPOSE | OPTIONAL |
| :--- | :--- | :--- |
| label | button text | no |
| url | button link | no |
| modifier | styling classes | yes |

**Example**

```markdown
  {{</* button "/" "doe nu mee" */>}}
```

### Picture

You want to use darkmode images when darkmode is enabled on a device and a regular image on lightmode? It takes 3 positional parameter

Store these images in the `static/images` directory.

**Syntax**

```markdown
...
{{</* picture "lightModeImage.png" "darkModeImage.png" "Image alt text" */>}}
...
```

**Result**

{{< picture "compose.svg" "compose-light.svg" "Compose Logo" >}}

### Gallery

Include inline galleries within your articles. These galleries can contain `N` number of images. It takes 2 positional parameters.

The 1st parameter is required. It's a _comma-separated list_ (`,`) of your images' paths.

The 2nd parameter is optional. It's a _double-collon-separated list_ (`::`) of your images' alt/description/captions text. It's always a good SEO practice to include alt text for your images.

**Syntax**

```markdown
...
{{</* gallery "images/painting.jpg,images/scribble.jpg,images/painting.jpg" "Gallery Image 1::gallery image 2::gallery image 1 copy" */>}}
...
```

{{< tip >}}

> For legibility, you may include a space after the delimiters `,` & `::`
> {{< /tip  >}}

**Result**

{{< gallery "images/painting.jpg,images/scribble.jpg,images/painting.jpg" "Gallery Image 1::gallery image 2::gallery image 1 copy" >}}

### Tab(s)

Use this short if you want to publish a multiple tabs component.

**Syntax**

```markdown
{{</* tabs "tabsId" */>}}
{{</* tab "First" */>}}
What could such a tab include?
{{</* /tab >}}
{{</* tab "Second" */>}}
- Some *bulletpoints*
- and more…
- …
{{</* /tab >}}
{{</* tab "Third" */>}}
> great wise words?
{{</* /tab */>}}
{{</* /tabs */>}}
```

**Result**

{{< tabs "tabsId" >}}
{{< tab "First" >}}
What could such a tab include?
{{< /tab >}}
{{< tab "Second" >}}
- Some *bulletpoints*
- and more…
- …
{{< /tab >}}
{{< tab "Third" >}}
> great wise words?
{{< /tab >}}
{{< /tabs >}}

### Tip

Use this short if you want to publish informational tooltips that look like:

This tooltips may take either of the following forms:

**Syntax**

```markdown
{{</* tip */>}}
Something of __interest__ you want to highlight
{{</* /tip */>}}
```

**Result**

{{< tip >}}
Something of **interest** you want to highlight
{{< /tip >}}

**OR**

**Syntax**

```markdown
{{</* tip "warning" */>}}
Something of __interest__ the user should be careful about
{{</* /tip */>}}
```

**Result**

{{< tip "warning" >}}
Something of **interest** the user should be careful about
{{< /tip >}}
