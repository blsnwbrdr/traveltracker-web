import { Component, OnInit } from '@angular/core';
import { MapMarker } from '@angular/google-maps'

// INTERFACES AND SERVICES
import { Countries } from '../interfaces/countries';
import { CountriesService } from '../services/countries.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  // GOOGLE MAP VARIABLES
  height = '100%';
  width = '100%';
  zoom = 3;
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 10,
    minZoom: 2,
  }
  markers = [];
  // DATA VARIABLES
  errorMessage = '';
  selectedCountries = [];
  countries: Countries[] = [];

  constructor(
    private countriesService: CountriesService,
    private localStorageService: LocalStorageService
  ){}

  ngOnInit(): void {
    // get current position for map centering
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
    // if there is local storage data, update selectedCountries array with data
    if(this.localStorageService.get('data') !== null){
      this.selectedCountries = this.localStorageService.get('data');
    }
    // import countries json data
    this.countriesService.getCountries().subscribe({
      next: countries => {
        // push lat/lng positions to markers array
        for(let countriesKey of countries){
          for(let selectedCountriesKey of this.selectedCountries){
            if(countriesKey.name === selectedCountriesKey){
              this.markers.push({
                position: {
                  lat: Number(countriesKey.latlng[0]),
                  lng: Number(countriesKey.latlng[1])
                }
              })
            }
          }
        }
        this.countries = countries;
      },
      error: err => this.errorMessage = err
    });
  }
}
