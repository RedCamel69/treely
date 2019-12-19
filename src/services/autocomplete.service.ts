import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(private http: HttpClient) { }

  autocomplete(term:string) {

    const headers = new HttpHeaders({ 'Boing': 'xyz', 'Ocp-Apim-Subscription-Key': '509b0bba9b624d8083f078826958b2a9' });

    console.log('Autocomplete Service:' + term);

    var res = this.http.get(
      'https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=' + encodeURI(term),
      { headers: headers }
    );

    console.log('grr' + res);

    return res;
  }
}
