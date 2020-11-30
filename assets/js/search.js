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

const searchPageElement = elem('#searchpage');

const searchOptions = {
  ignoreLocation: true,
  findAllMatches: true,
  includeScore: true,
  shouldSort: true,
  keys: searchKeys,
  threshold: 0.0
};

const index = new Fuse(idx, searchOptions);

function searchResults(results=[], query="") {
  let resultsFragment = new DocumentFragment();
  let showResults = elem('.search_results');
  if(searchPageElement) {
    showResults = searchPageElement;
  }
  emptyEl(showResults);
  if(results.length) {
    let resultsTitle = createEl('h3');
    resultsTitle.className = 'search_title';
    resultsTitle.innerText = 'Quick Links';
    if(searchPageElement) {
      resultsTitle.innerText = 'Search Results';
    }
    resultsFragment.appendChild(resultsTitle);
    results.slice(0,4).forEach(function(result){
      let item = createEl('a');
      item.href = `${result.link}?query=${query}`;
      item.className = 'search_result';
      item.style.order = result.score;
      if(searchPageElement) {
        pushClass(item, 'passive');
        let itemTitle = createEl('h3');
        itemTitle.textContent = result.title;
        item.appendChild(itemTitle);

        let itemDescription = createEl('p');
        // position of first search term instance
        let queryInstance = result.body.indexOf(query);
        itemDescription.textContent = `... ${result.body.substring(queryInstance, queryInstance + 200)} ...`;
        item.appendChild(itemDescription);
      } else {
        item.textContent = result.title;
      }
      resultsFragment.appendChild(item);
    });
  } else {
    showResults.innerHTML = (query.length >= 3) ? `<span class="search_result">No Results</span>` : "";
  }
  showResults.appendChild(resultsFragment);
}

function search(searchTerm) {
  // check if searchTerm can be cast as float
  const isFloat = parseFloat(searchTerm);
  const minimumSearchTermLength = isFloat ? 2 : 3;
  if(searchTerm.length >= minimumSearchTermLength) {
    let rawResults = index.search(searchTerm);
    rawResults = rawResults.map(function(result){
      const score = result.score;
      const resultItem = result.item;
      resultItem.score = (parseFloat(score) * 50).toFixed(0);
      return resultItem;
    });
    searchResults(rawResults, searchTerm);
  } else {
    searchResults();
  }
}

function liveSearch() {
  const searchField = elem('.search_field');

  if (searchField) {
    searchField.addEventListener('input', function() {
      const searchTerm = searchField.value.trim().toLowerCase();
      search(searchTerm);
    });
    searchField.addEventListener('search', function(){
      const searchTerm = searchField.value.trim().toLowerCase();
      window.location.href = `${parentURL}/search/?query=${searchTerm}`;
    });
  }
}

function findQuery(query = 'query') {
  const urlParams = new URLSearchParams(window.location.search);
  if(urlParams.has(query)){
    let c = urlParams.get(query);
    // window.find(c);
    cc = `${c.charAt(0).toUpperCase()}${c.substring(1,c.length)}`;
    // window.find(cc);
    return [c, cc];
  }
  return ["",""];
}

function passiveSearch() {
  if(searchPageElement) {
    const searchTerm = findQuery()[0];
    search(searchTerm);
  }
}

let main = elem('main');
if(!main) {
  main = elem('.main');
}

window.addEventListener('load', function() {
  searchPageElement ? false : liveSearch();
  passiveSearch();

  const searchQuery = findQuery();
  wrapText(searchQuery[0],main);
  wrapText(searchQuery[1],main);
});