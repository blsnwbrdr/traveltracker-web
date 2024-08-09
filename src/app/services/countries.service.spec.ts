import { inject, TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
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
    imports: [],
    providers: [CountriesService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    countriesService = new CountriesService(httpClientSpy);
  });

  it('should create', () => {
    expect(countriesService).toBeTruthy();
  });

  it('should be initialized', inject(
    [CountriesService],
    (countriesService: CountriesService) => {
      expect(countriesService).toBeTruthy();
    }
  ));

  it('#getCountries should return expected countries (HttpClient called once)', (done: DoneFn) => {
    const expectedCountries: ICountry[] = [
      { name: 'A', continent: 'AA', latlng: [], checked: false },
      { name: 'B', continent: 'BB', latlng: [], checked: true },
    ];

    httpClientSpy.get.and.returnValue(of(expectedCountries));

    countriesService.getCountries().subscribe({
      next: (data) => {
        expect(data)
          .withContext('expected countries')
          .toEqual(expectedCountries);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});
