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

function searchResults(results=[], query="", passive = false) {
  let resultsFragment = new DocumentFragment();
  let showResults = elem('.search_results');
  if(passive) {
    showResults = searchPageElement;
  }
  emptyEl(showResults);

  if(results.length) {
    let resultsTitle = createEl('h3');
    resultsTitle.className = 'search_title';
    resultsTitle.innerText = quickLinks;
    if(passive) {
      resultsTitle.innerText = searchResultsLabel;
    }
    resultsFragment.appendChild(resultsTitle);
    results.slice(0,4).forEach(function(result){
      let item = createEl('a');
      item.href = `${result.link}?query=${query}`;
      item.className = 'search_result';
      item.style.order = result.score;
      if(passive) {
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
    showResults.innerHTML = (query.length > 1) ? `<span class="search_result">${noMatchesFound}</span>` : `<h3><label for="find" class="search_result">${typeToSearch}</label></h3>`;
  }
  showResults.appendChild(resultsFragment);
}

function search(searchTerm, passive = false) {
  const minimumSearchTermLength = 2;
  if(searchTerm.length >= minimumSearchTermLength) {
    let rawResults = index.search(searchTerm);
    rawResults = rawResults.map(function(result){
      const score = result.score;
      const resultItem = result.item;
      resultItem.score = (parseFloat(score) * 50).toFixed(0);
      return resultItem;
    });

    passive ? searchResults(rawResults, searchTerm, true) : searchResults(rawResults, searchTerm);

  } else {
    passive ? searchResults([], "", true) : searchResults();
  }
}

function liveSearch() {
  const searchField = elem('.search_field');

  if (searchField) {
    searchField.addEventListener('input', function() {
      const searchTerm = searchField.value.trim().toLowerCase();
      search(searchTerm);
    });

    if(!searchPageElement) {
      searchField.addEventListener('search', function(){
        const searchTerm = searchField.value.trim().toLowerCase();
        if(searchTerm.length > 1)  {
          window.location.href = `${parentURL}/search/?query=${searchTerm}`;
        }
      });
    }
  }
}

function findQuery(query = 'query') {
  const urlParams = new URLSearchParams(window.location.search);
  if(urlParams.has(query)){
    let c = urlParams.get(query);
    return c;
  }
  return "";
}

function passiveSearch() {
  if(searchPageElement) {
    const searchTerm = findQuery();
    search(searchTerm, true);

    // search actively after search page has loaded
    const searchField = elem('.search_field');

    if(searchField) {
      searchField.addEventListener('input', function() {
        const searchTerm = searchField.value.trim().toLowerCase();
        search(searchTerm, true);
        wrapText(searchTerm, main);
      });
    }
  }
}

let main = elem('main');
if(!main) {
  main = elem('.main');
}

window.addEventListener('load', function() {
  searchPageElement ? false : liveSearch();
  passiveSearch();

  wrapText(findQuery(), main);
});