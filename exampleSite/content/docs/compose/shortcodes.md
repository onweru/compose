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

### Mermaid 

[Mermaid](https://mermaidjs.github.io/) is library that helps you generate diagrams, flowcharts, and piecharts  from text in a similar manner as markdown.

With compose theme, you can use mermaid using this shortcode as follows:

**Syntax**

```tpl
{{</* mermaid */>}}
sequenceDiagram
  participant Alice
  participant Bob
  Alice->>John: Hello John, how are you?
  loop Healthcheck
      John->>John: Fight against hypochondria
  end
  Note right of John: Rational thoughts<br/>prevail...
  John-->>Alice: Great!
  John->>Bob: How about you?
  Bob-->>John: Jolly good!
{{</* /mermaid */>}}
```

**Result**

{{< mermaid >}}
sequenceDiagram
  participant Alice
  participant Bob
  Alice->>John: Hello John, how are you?
  loop Healthcheck
      John->>John: Fight against hypochondria
  end
  Note right of John: Rational thoughts<br/>prevail...
  John-->>Alice: Great!
  John->>Bob: How about you?
  Bob-->>John: Jolly good!
{{< /mermaid >}}

{{< mermaid >}}
flowchart TB
  c1-->a2
  subgraph one
  a1-->a2
  end
  subgraph two
  b1-->b2
  end
  subgraph three
  c1-->c2
  end
  one --> two
  three --> two
  two --> c2
{{< /mermaid >}}

{{< mermaid >}}
graph LR;
  A-->B;
  B-->C;
  C-->D;
  D-->E;
  click A "http://www.github.com" _blank
  click B "http://www.github.com" "Open this in a new tab" _blank
  click C href "http://www.github.com" _blank
  click D href "http://www.github.com" "Open this in a new tab" _blank
{{< /mermaid >}}

{{< mermaid >}}
graph TB
  sq[Square shape] --> ci((Circle shape))

  subgraph A
    od>Odd shape]-- Two line<br/>edge comment --> ro
    di{Diamond with <br/> line break} -.-> ro(Rounded<br>square<br>shape)
    di==>ro2(Rounded square shape)
  end

  %% Notice that no text in shape are added here instead that is appended further down
  e --> od3>Really long text with linebreak<br>in an Odd shape]

  %% Comments after double percent signs
  e((Inner / circle<br>and some odd <br>special characters)) --> f(,.?!+-*ز)

  cyr[Cyrillic]-->cyr2((Circle shape Начало));

    classDef green fill:#9f6,stroke:#333,stroke-width:2px;
    classDef orange fill:#f96,stroke:#333,stroke-width:4px;
    class sq,e green
    class di orange
{{< /mermaid >}}

{{< mermaid >}}
graph TD
  B["fa:fa-twitter for peace"]
  B-->C[fa:fa-ban forbidden]
  B-->D(fa:fa-spinner);
  B-->E(A fa:fa-camera-retro perhaps?);
{{< /mermaid >}}

{{< mermaid >}}
graph LR
  A[Hard edge] -->|Link text| B(Round edge)
  B --> C{Decision}
  C -->|One| D[Result one]
  C -->|Two| E[Result two]
{{< /mermaid >}}

{{< mermaid >}}
classDiagram
  Animal <|-- Duck
  Animal <|-- Fish
  Animal <|-- Zebra
  Animal : +int age
  Animal : +String gender
  Animal: +isMammal()
  Animal: +mate()
  class Duck{
      +String beakColor
      +swim()
      +quack()
  }
  class Fish{
      -int sizeInFeet
      -canEat()
  }
  class Zebra{
      +bool is_wild
      +run()
  }
{{< /mermaid >}}

{{< mermaid >}}
stateDiagram-v2
  [*] --> Still
  Still --> [*]

  Still --> Moving
  Moving --> Still
  Moving --> Crash
  Crash --> [*]
{{< /mermaid >}}

{{< mermaid >}}
stateDiagram-v2
  [*] --> Active

  state Active {
    [*] --> NumLockOff
    NumLockOff --> NumLockOn : EvNumLockPressed
    NumLockOn --> NumLockOff : EvNumLockPressed
    --
    [*] --> CapsLockOff
    CapsLockOff --> CapsLockOn : EvCapsLockPressed
    CapsLockOn --> CapsLockOff : EvCapsLockPressed
    --
    [*] --> ScrollLockOff
    ScrollLockOff --> ScrollLockOn : EvScrollLockPressed
    ScrollLockOn --> ScrollLockOff : EvScrollLockPressed
  }
{{< /mermaid >}}

{{< mermaid >}}
stateDiagram-v2
  State1: The state with a note
  note right of State1
    Important information! You can write
    notes.
  end note
  State1 --> State2
  note left of State2 : This is the note to the left.
{{< /mermaid >}}

{{< mermaid >}}
erDiagram
  CUSTOMER ||--o{ ORDER : places
  ORDER ||--|{ LINE-ITEM : contains
  CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
{{< /mermaid >}}

{{< mermaid >}}
journey
  title My working day
  section Go to work
    Make tea: 5: Me
    Go upstairs: 3: Me
    Do work: 1: Me, Cat
  section Go home
    Go downstairs: 5: Me
    Sit down: 5: Me
{{< /mermaid >}}

{{< mermaid >}}
gantt
  dateFormat  YYYY-MM-DD
  title       Adding GANTT diagram functionality to mermaid
  excludes    weekends
  %% (`excludes` accepts specific dates in YYYY-MM-DD format, days of the week ("sunday") or "weekends", but not the word "weekdays".)

  section A section
  Completed task            :done,    des1, 2014-01-06,2014-01-08
  Active task               :active,  des2, 2014-01-09, 3d
  Future task               :         des3, after des2, 5d
  Future task2              :         des4, after des3, 5d

  section Critical tasks
  Completed task in the critical line :crit, done, 2014-01-06,24h
  Implement parser and jison          :crit, done, after des1, 2d
  Create tests for parser             :crit, active, 3d
  Future task in critical line        :crit, 5d
  Create tests for renderer           :2d
  Add to mermaid                      :1d

  section Documentation
  Describe gantt syntax               :active, a1, after des1, 3d
  Add gantt diagram to demo page      :after a1  , 20h
  Add another diagram to demo page    :doc1, after a1  , 48h

  section Last section
  Describe gantt syntax               :after doc1, 3d
  Add gantt diagram to demo page      :20h
  Add another diagram to demo page    :48h
{{< /mermaid >}}

{{< mermaid >}}
pie
  title Key elements in Product X
  "Calcium" : 42.96
  "Potassium" : 50.05
  "Magnesium" : 10.01
  "Iron" :  5
{{< /mermaid >}}