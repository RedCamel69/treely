import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { AutocompleteService } from '../../services/autocomplete.service';
import { Search } from '../../models/search';
import { Router } from '@angular/router';
import { Suggestions, suggestionGroups, suggestionGroup, searchSuggestions, searchSuggestion } from '../../models/autocomplete-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  readonly _DEBUG = true;
  indexForm: FormGroup;
  search: Search;
  values = '';
  hideSuggestions: boolean;
  currentSuggestionSelection = -1;
  autocompleteResponse: Suggestions;
  searchBoxHasFocus: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private searchService: SearchService,
    private autocompleteService: AutocompleteService) { }

  ngOnInit() {
    this.hideSuggestions = true;
    this.searchBoxHasFocus = false;

    this.search = new Search();
    this.autocompleteResponse = new Suggestions();
    this.autocompleteResponse.suggestionGroups = new suggestionGroups();
    this.autocompleteResponse.suggestionGroups[0] = new suggestionGroup();
    this.autocompleteResponse.suggestionGroups[0].searchSuggestions = new searchSuggestions();
    this.autocompleteResponse.suggestionGroups[0].searchSuggestions[0] = new searchSuggestion();
    this.autocompleteResponse.suggestionGroups[0].searchSuggestions[0].displayText = "The Woodland Trust";
    
    this.search.Phrase = "The woodland trust";

    this.indexForm = this.fb.group({
      search: [null, [Validators.required]]
    });

    this.indexForm.patchValue({ search: this.search.Phrase }); 
  }

  onBlur() {
    console.log('b');
    this.searchBoxHasFocus = false;
  }

  onFocus() {
    console.log('f');
    this.searchBoxHasFocus = true;
  }

  autocomplete(term) {

    this.autocompleteService.autocomplete(term).subscribe(
      data => {
        this.autocompleteResponse = data as Suggestions;
        this.currentSuggestionSelection = -1;
      },
      err => console.error(err)

    )
  }

  onKey(event: any) {

    if (event.code === "Enter") {
      this.continue();
    }

    if (event.code !== "ArrowDown" && event.code !== "ArrowLeft" && event.code !== "ArrowRight" && event.code !== "ArrowUp" ) {  //need to exclude all arrow keys!
      /*Display Suggestions */
      this.values = event.target.value;

      if (this.values.length > 2) {
        this.autocomplete(this.values);
        this.hideSuggestions = false;
      }
      else {
        this.hideSuggestions = true;
      }
    }

    /*End Display Suggestions */


    /* Defining Search? */
    var definingSearch = false;

    if (event.srcElement.id === "search") {
      definingSearch = true;
    }

    var index = -1;
    var numberOfSuggestions = document.getElementsByClassName("suggestion-list").length;


    ////arrow down
    if (definingSearch && event.code === "ArrowDown") {
      console.log('down');
      console.log(numberOfSuggestions)

      if (this.currentSuggestionSelection == -1 || this.currentSuggestionSelection == 8) {
        this.currentSuggestionSelection = 1
      }
      else {
        this.currentSuggestionSelection = this.currentSuggestionSelection + 1;
      }

      this.search.Phrase = this.autocompleteResponse.suggestionGroups[0].searchSuggestions[this.currentSuggestionSelection - 1].displayText;

      this.indexForm.patchValue({ search: this.search.Phrase });

    }

    ////arrow up
    if (definingSearch && event.code === "ArrowUp") {

      if (this.currentSuggestionSelection == 1 ) {
        this.currentSuggestionSelection = 8
      }
      else {
        this.currentSuggestionSelection = this.currentSuggestionSelection - 1;
      }

      this.search.Phrase = this.autocompleteResponse.suggestionGroups[0].searchSuggestions[this.currentSuggestionSelection - 1].displayText;

      this.indexForm.patchValue({ search: this.search.Phrase });

    }



  }

  useSuggestion(suggestion) {

    this.indexForm.patchValue({ search: suggestion.displayText });
    this.hideSuggestions = true;
    console.log(this.hideSuggestions);

  }

  continue(): void {
    this.search.Phrase = this.indexForm.get('search').value;
    this.router.navigate(['./search', { 'search': this.search.Phrase, 'count': 10, 'offset': 0 }])
  }

  doSearch() {
    this.continue();
  }
}
