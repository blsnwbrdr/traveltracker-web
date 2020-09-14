import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  selectedCountries = [];

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    // if there is local storage data, update selectedCountries array
    if(this.localStorageService.get('data') !== null){
      let localStorage = this.localStorageService.get('data');
      // sort selected countries alphabetically
      localStorage.sort((a,b) => {
        if (a < b)
          return -1;
        if (a > b)
          return 1;
        return 0;
      });
      this.selectedCountries = localStorage;
    }
  }

}
