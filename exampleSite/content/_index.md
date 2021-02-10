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

Compose is a lean theme for the `Hugo`, inspired by [forestry.io](https://forestry.io). 

We do a [Pull Request](https://github.com/onweru/compose/pulls) contributions workflow on **GitHub**. Also feel free to raise any issues or feature suggestions.

{{< tip "warning" >}}
Note that the theme is built with simplicity in mind. [This way](/), if a suggestion complicates the usability of the theme, it may be declined. New users are always welcome!
{{< /tip >}}

{{< tip >}}
You can [generate graphs, charts](]("docs/compose/graphs-charts-tables/#show-a-pie-doughnut--bar-chart-at-once")) and tables from a csv, ~~or a json~~ dataset
{{< /tip >}}

{{< button "docs/compose/" "Read the Docs" >}}{{< button "https://github.com/onweru/compose" "Download Theme" >}}
{{< /column >}}

{{< column >}}
![diy](/images/scribble.jpg)
{{< /column >}}
{{< /block >}}
