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
    "body": "{{ .PlainWords }}".toLowerCase(),
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

function searchResults(results=[], order =[],query="") {
  let resultsFragment = new DocumentFragment();
  let showResults = elem('.search_results');
  emptyEl(showResults);
  let index = 0
  if(results.length) {
    let resultsTitle = createEl('h3');
    resultsTitle.className = 'search_title';
    resultsTitle.innerText = 'Quick Links';
    resultsFragment.appendChild(resultsTitle);
    results.slice(0,6).forEach(function(result){
      let item = createEl('a');
      item.href = `${result.link}?query=${query}`;
      item.className = 'search_result';
      item.textContent = result.title;
      item.style.order = order[index];
      resultsFragment.appendChild(item);
      index += 1
    });
  } else {
    showResults.innerHTML = "";
  }
  showResults.appendChild(resultsFragment);
}

function search(){
  const searchField = elem('.search_field');

  if (searchField) {
    searchField.addEventListener('input', function(event) {
      const searchTerm = this.value.trim().replaceAll(" ", " +").toLowerCase();
      if(searchTerm.length >= 3) {
        let rawResults = idx.search(`+${searchTerm}`);


        if(rawResults.length) {

          let refs = rawResults.map(function(ref){
            // return id and score in a single string
            return `${ref.ref}:${ref.score}`;
          });

          let ids = refs.map(function(id){
            let positionOfSeparator = id.indexOf(":");
            id = id.substring(0,positionOfSeparator)
            return Number(id);
          });

          let scores = refs.map(function(score){
            let positionOfSeparator = score.indexOf(":");
            score = score.substring((positionOfSeparator + 1), (score.length - 1));
            return (parseFloat(score) * 50).toFixed(0);
          });

          let matchedDocuments = simpleIndex.filter(function(doc){
            return ids.includes(doc.id);
          });

          matchedDocuments.length >= 1 ? searchResults(matchedDocuments, scores,searchTerm) : false;
        } else {
          searchResults();
        }

      } else {
        searchResults();
      }
    });
  }
}

let alltext = doc.innerHTML;
// doc.innerHTML = alltext.replaceAll('is', '<span class="is">is</span>');


window.addEventListener('load', () => search());