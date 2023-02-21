import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

// SERVICES
import { CountriesService } from './countries.service';

// INTERFACES
import { ICountry } from '../interfaces/country.model';

describe('CountriesService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let countriesService: CountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountriesService],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    countriesService = new CountriesService(httpClientSpy);
  });

  it('should be created', () => {
    expect(countriesService).toBeTruthy();
  });

  it('should return expected countries (HttpClient called once)', (done: DoneFn) => {
    const expectedCountries: ICountry[] = [
      { name: 'A', continent: 'AA', latlng: [], checked: false },
      { name: 'B', continent: 'BB', latlng: [], checked: true },
    ];

    httpClientSpy.get.and.returnValue(of(expectedCountries));

    countriesService.getCountries().subscribe({
      next: (data) => {
        expect(data).withContext('expected heroes').toEqual(expectedCountries);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});
