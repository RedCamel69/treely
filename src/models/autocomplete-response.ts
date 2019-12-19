export class Suggestions {

  queryContext: queryContext;
  suggestionGroups: suggestionGroups;
}


export class queryContext {
  originalQuery: string;
}


export class suggestionGroups {
  name: string;
  suggestionGroup: suggestionGroup;
}


export class suggestionGroup {
  name: string;
  searchSuggestions: searchSuggestions;
}

export class searchSuggestions {
  value: Array<searchSuggestion>;
}

export class searchSuggestion {
  url: string;
  displayText: string;
}



