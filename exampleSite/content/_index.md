+++
title = "Compose"
# define chart data here
[data]
  fileLink = "content/projects.csv" # path to where csv is stored
  colors = ["#627c62", "#11819b", "#ef7f1a", "#4e1154"] # chart colors
  columnTitles = ["Section", "Status", "Author"] # optional if no table will be displayed from dataset
  baseChartOn = 3 # number of column the chart(s) and graph should be drawn from # can be overridden directly via shortcode parameter # it's therefore optional
  title = "Projects"
+++

{{< block "grid-2" >}}
{{< column >}}
# Compose your Docs with __Ease__.

Compose is a lean `Hugo` domentation theme, inspired by [forestry.io](https://forestry.io). 

{{< tip "warning" >}}
Feel free to open a [PR](https://github.com/onweru/compose/pulls), raise an issue(s) or request new feature(s).
{{< /tip >}}

{{< tip >}} 
You can generate diagrams, flowcharts, and piecharts from text in a similar manner as markdown using [mermaid](./docs/compose/mermaid/).

Or, [generate graphs, charts]("./docs/compose/graphs-charts-tables/#show-a-pie-doughnut--bar-chart-at-once") and tables from a csv, ~~or a json~~ file.
{{< /tip >}}

{{< button "docs/compose/" "Read the Docs" >}}{{< button "https://github.com/onweru/compose" "Download Theme" >}}
{{< /column >}}

{{< column >}}
![diy](/images/scribble.jpg)
{{< /column >}}
{{< /block >}}
