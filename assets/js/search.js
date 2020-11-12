const idx = [
  {{- range .Site.Pages }}
  {
    "link": "{{ .Permalink }}",
    "title": "{{ .Title }}",
    "body": "{{ .PlainWords }}".toLowerCase(),
  },
  {{- end }}
];

const searchKeys = ['title', 'link', 'body', 'id'];
const searchOptions = {
  ignoreLocation: true,
  includeScore: true,
  includeMatches: true,
  keys: searchKeys,
  threshold: 0.1
};

const index = new Fuse(idx, searchOptions);

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
    searchField.addEventListener('input', function() {
      const searchTerm = this.value.trim().replaceAll(" ", " +").toLowerCase();
      if(searchTerm.length >= 3) {
        let rawResults = index.search(searchTerm);
        rawResults = rawResults.map(function(result){
          return result.item;
        });

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
          searchResults(rawResults, scores,searchTerm);
        } else {
          searchResults();
        }

      } else {
        searchResults();
      }
    });
  }
}

function findQuery(query = 'query') {
  const urlParams = new URLSearchParams(window.location.search);
  if(urlParams.has(query)){
    const searchTerm = urlParams.get(query);
    window.find(searchTerm);
    return searchTerm;
  }
  return "";
}

let main = elem('main');
if(!main) {
  main = elem('.main');
}
const searchQuery = findQuery();
wrapText(searchQuery,main,'mark');

window.addEventListener('load', () => search());