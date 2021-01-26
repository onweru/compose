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
