import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Country } from '../models/country.model'

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  countriesList: Country[];
  filterTerm: string

  constructor(private http: HttpClient, private apiService: ApiService) { }

  async ngOnInit() {

    // Only load countriesList from API 
    await this.apiService.retrieveCountries();

    this.countriesList = this.apiService.countriesList;

    console.log(this.countriesList);

  }

}
