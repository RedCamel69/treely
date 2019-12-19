import { Injectable } from '@angular/core';
import {
  HttpClientJsonpModule, HttpClient, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }


  search(searchPhrase: string, count: number, offset: number) {


    const headers = new HttpHeaders({ 'Boing': 'xyz', 'Ocp-Apim-Subscription-Key': '509b0bba9b624d8083f078826958b2a9' });


    console.log('Search Service:' + searchPhrase, count, offset);

    var res = this.http.get(
      'https://api.cognitive.microsoft.com/bing/v7.0/search?q=' + encodeURI(searchPhrase) + '&mkt=en-gb&count=' + count + '&offset=' + offset,
      { headers: headers }
    );

    //console.log('grrr' + res);
    return res;
  }

  wikipediaSearch(searchPhrase: string) {

    const headers = new HttpHeaders({ 'contentType': 'application/json; charset=utf-8', 'async': 'false', 'datatype': 'json' });

    var res = this.http.jsonp(
      //url: "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&redirects&titles=Tom_Cruise&callback=?",
      'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&redirects&titles=' + searchPhrase + '&callback=?',
      'callback'
      //'https://api.cognitive.microsoft.com/bing/v7.0/search?q=' + encodeURI(searchPhrase) + '&mkt=en-gb&count=' + count + '&offset=' + offset,
      //{ headers: headers }
    );

    return res;
  }

}
