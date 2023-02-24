const search_result_class = 'search_result';
const empty_string = '';
const search_field_class = '.search_field';
const search_class = '.search';

// defined in i18n / translation files
const quick_links = '{{ T "quick_links" }}';
const search_results_label = '{{ T "search_results_label" }}';
const short_search_query = '{{ T "short_search_query" }}'
const type_to_search = '{{ T "type_to_search" }}';
const no_matches_found = '{{ T "no_matches" }}';

// values defined under config/_default/params.toml
let other_searchable_fields = '{{ delimit (default slice site.Params.otherSearchableFields) ", " }}'

if(other_searchable_fields.length > 2) {
  other_searchable_fields = other_searchable_fields
    .split(",")
    .map(search_value => search_value.toLowerCase().trim());
} else {
  other_searchable_fields = [];
}

// Algolia specific
const algolia_config = JSON.parse(`{{ partialCached "functions/getAlgoliaConfig" . }}`);

function initAlgoliaSearch() {
  const algolia_client = algoliasearch(algolia_config.id, algolia_config.key);
  const algolia_index = algolia_client.initIndex(algolia_config.index);

  // Fuse specific

  // Search for "query string" in the index "contacts"
  algolia_index.search('custom css').then(({ hits }) => {
    console.log(hits);
  });

  // Perform the same search, but only retrieve 50 results
  // Return only the attributes "firstname" and "lastname"
  algolia_index.search('query string', {
    attributesToRetrieve: ['firstname', 'lastname'],
    hitsPerPage: 50,
  }).then(({ hits }) => {
    console.log(hits);
  });
}
