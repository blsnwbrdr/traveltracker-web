import { Component, OnInit } from '@angular/core';
import {} from '@angular/google-maps';

// INTERFACES AND SERVICES
import { ICountry } from '../interfaces/country';
import { CountriesService } from '../services/countries.service';
import { LocalStorageService } from '../services/local-storage.service';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  // GOOGLE MAP VARIABLES
  apiLoaded!: boolean;
  height = '100%';
  width = '100%';
  zoom = 3;
  center: google.maps.LatLngLiteral = {
    lat: 34,
    lng: 9,
  };
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 10,
    minZoom: 2,
  };
  markers = [];
  // DATA VARIABLES
  errorMessage = '';
  selectedCountries = [];
  countries: ICountry[];

  constructor(
    private mapService: MapService,
    private countriesService: CountriesService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    // get api to load map
    this.mapService.obsCurrentApiStatus.subscribe((status) => {
      this.apiLoaded = status.valueOf();
    });
    // if there is local storage data, update selectedCountries array with data
    if (this.localStorageService.get('Visited') !== null) {
      this.selectedCountries = this.localStorageService.get('Visited');
    }
    // import countries json data
    this.countriesService.getCountries().subscribe({
      next: (countries) => {
        // push lat/lng positions to markers array
        for (const countriesKey of countries) {
          for (const selectedCountriesKey of this.selectedCountries) {
            if (countriesKey.name === selectedCountriesKey) {
              this.markers.push({
                position: {
                  lat: Number(countriesKey.latlng[0]),
                  lng: Number(countriesKey.latlng[1]),
                },
              });
            }
          }
        }
        this.countries = countries;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
