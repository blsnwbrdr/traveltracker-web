import { inject, TestBed } from '@angular/core/testing';

// SERVICES
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should create', () => {
    expect(localStorageService).toBeTruthy();
  });

  it('should be initialized', inject(
    [LocalStorageService],
    (localStorageService: LocalStorageService) => {
      expect(localStorageService).toBeTruthy();
    }
  ));

  it('#get should be called and return value', () => {
    spyOn(Object.getPrototypeOf(localStorage), 'getItem');
    const returnValue = localStorageService.get('');
    expect(Object.getPrototypeOf(localStorage).getItem).toHaveBeenCalled();
    expect(returnValue).toBeTruthy();
  });

  it('#set should be called and return value', () => {
    spyOn(Object.getPrototypeOf(localStorage), 'removeItem');
    const returnValue = localStorageService.remove('');
    expect(Object.getPrototypeOf(localStorage).removeItem).toHaveBeenCalled();
    expect(returnValue).toBeTruthy();
  });

  it('#remove should be called and return value', () => {
    spyOn(Object.getPrototypeOf(localStorage), 'setItem');
    const returnValue = localStorageService.set('', []);
    expect(Object.getPrototypeOf(localStorage).setItem).toHaveBeenCalled();
    expect(returnValue).toBeTruthy();
  });

  it('#isLocalStorageSupported should return value', () => {
    const returnValue = localStorageService.isLocalStorageSupported;
    expect(returnValue).toBeTruthy();
  });
});
