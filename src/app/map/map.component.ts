import { Component, OnInit } from '@angular/core';
import {} from '@angular/google-maps';

// INTERFACES
import { ICountry } from '../interfaces/country.model';

// MODELS
import { Marker } from '../models/marker.model';

// SERVICES
import { CountriesService } from '../services/countries.service';
import { LocalStorageService } from '../services/local-storage.service';
import { MapService } from '../services/map.service';

// CONFIGS
import { Configs } from '../configs/configs.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  errorMessage!: string;
  selectedCountries!: Array<string>;
  countries!: ICountry[];
  // GOOGLE MAP
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
    mapId: this.configs.googleMapsID,
  };
  markers: Marker[] = [];

  constructor(
    private configs: Configs,
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
      next: (data: ICountry[]) => {
        // push lat/lng positions to markers array
        for (const countriesKey of data) {
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
        this.countries = data;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
