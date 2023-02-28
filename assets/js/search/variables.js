const search_result_class = 'search_result';
const empty_string = '';
const search_field_class = '.search_field';
const search_class = '.search';
let search_term = empty_string;
const search_field = elem(search_field_class);

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

const search_page_element = elem('#searchpage');
let search_scope_global = `{{ trim site.Params.search.global " " }}`;
search_scope_global = search_scope_global == 'true' ? true : false;

// Fuse specific
let search_keys = ['body', 'title', 'link', 'section', 'id',];
search_keys = search_keys.concat(other_searchable_fields);

const search_options = {
  ignoreLocation: true,
  findAllMatches: true,
  includeScore: true,
  shouldSort: true,
  keys: search_keys,
  threshold: 0.1
};

// Algolia specific
const algolia_config = JSON.parse(`{{ partialCached "functions/getAlgoliaConfig" . }}`);
