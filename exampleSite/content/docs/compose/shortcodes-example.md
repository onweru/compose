---
title: "Shortcodes Applied"
weight: 7
description: >
  This is how the shortcodes would look like in action
---

### Using blocks, columns & buttons

```sh
{{</* block "grid-2" */>}}
{{</* column */>}}
#### Coumn 1 

Lorem ipsum dolor sit amet, 
...

{{</* button "https://github.com/onweru/compose" "Download Theme" */>}}

{{</* /column */>}}
{{</* column */>}}

<!-- generates 👇 -->
```

{{< block "grid-2" >}}
{{< column >}}
#### Coumn 1 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 

dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

{{< button "https://github.com/onweru/compose" "Download Theme" >}}

{{< /column >}}
{{< column >}}
#### Coumn 2


Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 

> dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

{{< button "docs/" "Read the Docs" >}}

{{< /column >}}
{{< /block >}}

### Youtube

```sh
{{</* youtube "q0hyYWKXF0Q" */>}}
<!-- generates 👇 -->
```

{{< youtube "q0hyYWKXF0Q" >}}

## Picture

```sh
{{</* picture "compose.svg" "compose-light.svg" "Compose Logo" */>}} 
<!-- generates 👇 -->
```

{{< picture "compose.svg" "compose-light.svg" "Compose Logo" >}}

## Gallery

Include inline galleries within your articles. These galleries can contain `N` number of images. It take 2 positional parameters. 

The 1st parameter is required. It is _comma-separated list_ (`,`) of your images' paths.

The 2nd parameter is optional. It is _double-collon-separated list_ (`::`) of your images' alt/description/captions text. It's always a good SEO practice to include alt text for your images.

```sh
{{</* gallery "images/painting.jpg,images/scribble.jpg,images/painting.jpg" "Gallery Image 1::gallery image 2::gallery image 1 copy" */>}}
# generates 👇
```

{{< gallery "images/painting.jpg,images/scribble.jpg,images/painting.jpg" "Gallery Image 1::gallery image 2::gallery image 1 copy" >}}

> For legibility, you may include a space after the delimiters `,` & `::`
