import { Component, OnInit } from '@angular/core';

// INTERFACES
import { ICountry } from '../interfaces/country.model';

// SERVICES
import { CountriesService } from '../services/countries.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  selectedCountries!: Array<string>;
  numCountries!: number;

  constructor(
    private countriesService: CountriesService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    // if there is local storage data, update selectedCountries array with data
    if (this.localStorageService.get('Visited') !== null) {
      const localStorage = this.localStorageService.get('Visited');
      // sort selected countries alphabetically
      localStorage.sort((a: string, b: string) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
      this.selectedCountries = localStorage;
    }
    // get number of countries from json data
    this.countriesService.getCountries().subscribe({
      next: (data: ICountry[]) => {
        this.numCountries = data.length;
      },
    });
  }
}
