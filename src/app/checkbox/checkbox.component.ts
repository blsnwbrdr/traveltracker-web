import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Countries } from '../service/countries';
import { CountriesService } from '../service/countries.service';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})

export class CheckboxComponent implements OnInit {
  errorMessage = '';
  countries: Countries[] = [];
  selectedCountries: FormGroup;

  constructor(private fb: FormBuilder,
              private countriesService: CountriesService,
              private localStorageService: LocalStorageService
            ) { }

  ngOnInit(): void {
    // import countries list data
    this.countriesService.getCountries().subscribe({
      next: countries => {
        // sort array of data
        countries.sort((a,b) => {
          if (a.name < b.name)
            return -1;
          if (a.name > b.name)
            return 1;
          return 0;
        });
        this.countries = countries;
      },
      error: err => this.errorMessage = err
    });
    // selected countries
    this.selectedCountries = this.fb.group({
      userSelectedCountries: this.fb.array([])
    });
  }

  // ON CHANGE CHECKBOX METHOD
  onChange(name: string, isChecked: boolean){
    // user selected countries
    const selectedCountriesArray = <FormArray>this.selectedCountries.controls.userSelectedCountries;
    // update selected countries array with selected and deselected countries
    if(isChecked){
      selectedCountriesArray.push(new FormControl(name));
    }else{
      let index = selectedCountriesArray.controls.findIndex(x => x.value == name);
      selectedCountriesArray.removeAt(index);
    }
    // return selected countries array
    // console.log(selectedCountriesArray.value);
    this.saveData('list', selectedCountriesArray.value);
    return selectedCountriesArray.value;
  }

  // SAVE DATA TO LOCAL STORAGE
  saveData(key: string, value: any){
    this.localStorageService.set(key, value);
  }

  // READ DATA FROM LOCAL STORAGE
  readData(key: string){
    this.localStorageService.get(key);
  }
}
