+++
title = "Customize layouts & components"
description = "basic configuration"
# weight = 10
+++

### Shortcodes modifiers

These modifiers are classes you can use with shortcodes to customize the look and feel of your layouts and components.

#### Grid
|  modifier |  space    |
| --- | --- |
| grid-2 | 2 columns |
| grid-3 | 3 columns |
| grid-4 | 4 columns |

#### Spacing
|  modifier |  space    |
| ---| --- |
| mt-1 | 1.5rem top margin |
| mt-2 | 3rem top margin |
| mt-3 | 4.5rem top margin |
| mt-4 | 6rem top margin |

> use pt-1 ~ pt-4 for top padding

|  modifier |  space    |
|---| --- |
| mb-1 | 1.5rem bottom margin |
| mb-2 | 3rem bottom margin |
| mb-3 | 4.5rem bottom margin |
| mb-4 | 6rem bottom margin |

> use pb-1 ~ pb-4 for bottom padding

### How do I disable dark mode?

Under `params` add `enableDarkMode = false` to your `config.toml` file. If your site is based on the exampleSite, the value is already included; you only need to uncomment it.

> The user will still have the option to activate dark mode, if they so wish through the UI

### How do I change the theme color?
If the theme is a git submodule, you can copy the file `assets/sass/_variables.sass` from the theme into your own site.  
The location must be exactly the same as in the theme, so put it in `YourFancySite/assets/sass/`.
You can then edit the file to customize the theme color in your site without having to modify the theme itself.

### How can I change the address bar color on mobile devices?
Just put the following line in the `[params]` section in your `config.toml` file (and of course change the color):
````toml
metaThemeColor = "#123456"
````