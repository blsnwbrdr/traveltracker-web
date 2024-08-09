import { inject, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

// SERVICES
import { MapService } from './map.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('MapService', () => {
  let mapService: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MapService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    mapService = TestBed.inject(MapService);
  });

  it('should create', () => {
    expect(mapService).toBeTruthy();
  });

  it('should be initialized', inject([MapService], (mapService: MapService) => {
    expect(mapService).toBeTruthy();
  }));
});
