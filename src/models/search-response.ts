export class SearchResponse {
    webPages: webPages;
    queryContext: queryContext;
}


export class webPages {

    totalEstimatedMatches: Number;
    value: Array<value>;
}

export class value {
    displayUrl: string;
    name: string;
}


export class queryContext {
    originalQuery: string;
}


export class WikipediaSearchResponse {
    batchcomplete: string;
    query : WikiQuery
}

export class WikiQuery {
    //normalized: object;
    pages: WikiPage[];
} 

export class WikiPage {
    extract: string;
    ns: number;
    pageid: number;
    title: string;
    
}