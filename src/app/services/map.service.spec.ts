import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// SERVICES
import { MapService } from './map.service';

describe('MapService', () => {
  let mapService: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MapService],
    });
    mapService = TestBed.inject(MapService);
  });

  it('should create', () => {
    expect(mapService).toBeTruthy();
  });

  it('should be initialized', inject([MapService], (mapService: MapService) => {
    mapService;
    expect(mapService).toBeTruthy();
  }));
});
