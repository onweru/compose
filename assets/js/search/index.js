function minQueryLen(query) {
  query = query.trim();
  const query_is_float = parseFloat(query);
  const min_query_length = query_is_float ? 1 : 2;
  return min_query_length;
}

function findQuery(query = 'query') {
  const url_params = new URLSearchParams(window.location.search);
  return url_params.has(query) ? url_params.get(query) : empty_string;
}

function search(index, scope = null, passive = false) {
  scope = search_scope_global ? null : scope;
  if(search_term.length) {
    let raw_results = index;
    if(!algolia_config.on) {
      raw_results = index.search(search_term);
      raw_results = raw_results.map(function(result){
        const score = result.score;
        const result_item = result.item;
        result_item.score = (parseFloat(score) * 50).toFixed(0);
        return result_item;
      })
    }

    if(scope) {
      raw_results = raw_results.filter(result_item => {
        return result_item.section == scope;
      });
    }

    passive ? searchResults(raw_results, search_term, true) : searchResults(raw_results, search_term);

  } else {
    passive ? searchResults([], empty_string, true) : searchResults();
  }
}

function liveSearch(index) {
  if (search_field) {
    let search_scope = search_field.dataset.scope;
    search(index, search_scope);
    search_scope = search_scope_global ? null : search_scope;
    if(!search_page_element) {
      search_field.addEventListener('search', function(){
        search_term = search_field.value.trim().toLowerCase();
        if(search_term.length)  {
          const scope_parameter = search_scope ? `&scope=${search_scope}` : empty_string;
          window.location.href = new URL(`search/?query=${search_term}${ scope_parameter }`, root_url).href;
        }
      });
    }
  }
}

function searchResults(results=[], query=empty_string, passive = false) {
  let results_fragment = new DocumentFragment();
  let show_results = elem('.search_results');
  if(passive || search_page_element) {
    show_results = search_page_element;
  }
  emptyEl(show_results);

  const query_len = query.length;
  const required_query_len = minQueryLen(query);

  if(results.length && query_len >= required_query_len) {
    let results_title = createEl('h3');
    results_title.className = 'search_title';
    results_title.innerText = quick_links;

    let go_back_button = createEl('button');
    go_back_button.textContent = 'Go Back';
    go_back_button.className = go_back_class;
    if(passive) {
      results_title.innerText = search_results_label;
    }
    if(!search_page_element) {
      results = results.slice(0,8);
    } else {
      // results_fragment.appendChild(go_back_button);
      results = results.slice(0,12);
    }
    results_fragment.appendChild(results_title);

    results.forEach(function(result){
      let item = createEl('a');
      item.href = `${result.link}?query=${query}`;
      item.className = search_result_class;
      item.style.order = result.score;
      if (passive) {
        pushClass(item, 'passive');
        let item_title = createEl('h3');
        item_title.textContent = result.title;
        item.appendChild(item_title);

        let item_description = createEl('p');
        // position of first search term instance
        let query_instance = result.body.indexOf(query);
        item_description.textContent = `${result.body.substring(query_instance, query_instance + 200)}`;
        item.appendChild(item_description);
      } else {
        item.textContent = result.title;
      }
      results_fragment.appendChild(item);
    });
  }

  if(show_results) {
    let results_title_contents  = empty_string;
    if(query_len >= required_query_len) {
      results_title_contents = !results.length ?
         `<span class='${search_result_class}'>${no_matches_found}</span>` : empty_string;
    } else {
      results_title_contents = `<label for="find" class='${search_result_class}'>${ query_len > 1 ? short_search_query : type_to_search }</label>`
    }

    show_results.innerHTML = results_title_contents;

    show_results.appendChild(results_fragment);
  }
}

function passiveSearch(index) {
  if(search_page_element) {
    search_term = findQuery();
    const search_scope = findQuery('scope');
    search(index, search_scope, true);
  }
}

function hasSearchResults() {
  const results = elem('.results');
  return results ? [results, results.innerHTML.length] : false;
}

function clearSearchResults() {
  let results = hasSearchResults();
  if(results) {
    results = results[0];
    results.innerHTML = empty_string;
    elem(search_field_class).value = empty_string;
  }
}

function onEscape(fn){
  window.addEventListener('keydown', event => event.code === "Escape" ? fn() : false);
}

function initFuseSearch(manual = true) {
  const page_language = document.documentElement.lang;
  const search_index = `${ page_language === 'en' ? empty_string : page_language}/index.json`;
  fetch(new URL(search_index, root_url).href)
  .then(response => response.json())
  .then(function(search_data) {
    search_data = search_data.length ? search_data : [];
    const fuse_index = new Fuse(search_data, search_options);
    manual ? liveSearch(fuse_index) : passiveSearch(fuse_index);
  })
  .catch((error) => console.error(error));
}

function initAlgoliaSearch(manual = true) {
  const algolia_client = algoliasearch(algolia_config.id, algolia_config.key);
  const algolia_index = algolia_client.initIndex(algolia_config.index);
  algolia_index.search(search_term, {
    attributesToRetrieve: search_keys.slice(0,5),
    hitsPerPage: 12,
  }).then(({ hits }) => {
    manual ? liveSearch(hits) : passiveSearch(hits);
  });
}

function initializeSearch() {
  let main = elem('main');
  main = main ? main : elem('.main');

  search_field.addEventListener('input', function() {
    search_term = search_field.value.trim().toLowerCase();
    algolia_config.on ? initAlgoliaSearch() : initFuseSearch();
  });

  if (search_page_element) {
    algolia_config.on ? initAlgoliaSearch(false) : initFuseSearch(false);
  }

  wrapText(findQuery(), main);

  onEscape(clearSearchResults);

  window.addEventListener('click', function(event){
    const target = event.target;
    const is_search = target.closest(search_class) || target.matches(search_class);
    !is_search && !search_page_element ? clearSearchResults() : false;
  });
}

window.addEventListener('load', () => initializeSearch());
