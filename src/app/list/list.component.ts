import { Component, OnInit } from '@angular/core';

// INTERFACES AND SERVICES
import { ICountry } from '../interfaces/country.model';
import { CountriesService } from '../services/countries.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  // VARIABLES
  errorMessage!: string;
  selectedCountries!: Array<string>;
  countries!: ICountry[];

  constructor(
    private countriesService: CountriesService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    // if there is local storage data, update selectedCountries array with data
    if (this.localStorageService.get('Visited') !== null) {
      this.selectedCountries = this.localStorageService.get('Visited');
    }
    // import countries json data
    this.countriesService.getCountries().subscribe({
      next: (data: ICountry[]) => {
        // sort countries alphabetically by name
        data.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        // add 'checked' property for selectedCountries from local storage
        for (const countriesKey of data) {
          for (const selectedCountriesKey of this.selectedCountries) {
            if (countriesKey.name === selectedCountriesKey) {
              countriesKey['checked'] = true;
            }
          }
        }
        this.countries = data;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  // ON CHANGE CHECKBOX METHOD
  onChange(name: string, isChecked: boolean) {
    // update selected countries data to local storage
    if (isChecked) {
      this.selectedCountries.push(name);
      this.saveData('Visited', this.selectedCountries);
    } else {
      const index = this.selectedCountries.indexOf(name);
      this.selectedCountries.splice(index, 1);
      this.saveData('Visited', this.selectedCountries);
    }
  }

  // SAVE DATA TO LOCAL STORAGE METHOD
  saveData(key: string, value: Array<string>) {
    this.localStorageService.set(key, value);
  }
}
