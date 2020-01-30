const idx = lunr(function () {
  this.field('id')
  this.field('link')
  this.field('title')
  this.field('body')

  {{ range $index, $page := .Site.Pages }}
  this.add({
    "id": "{{ $index }}",
    "link": "{{ .Permalink }}",
    "title": "{{ .Title }}",
    "body": "{{ .PlainWords }}",
  });
  {{ end }}
});

const simpleIndex = [
  {{ range $index, $page := .Site.Pages }}
   {
     id: {{ $index }},
     link: "{{ .Permalink }}",
     title: "{{ .Title }}",
   },
  {{ end }}
];
