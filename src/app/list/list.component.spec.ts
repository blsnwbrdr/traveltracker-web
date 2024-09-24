import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';

// COMPONENTS
import { ListComponent } from './list.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

// INTERFACES
import { ICountry } from '../interfaces/country.model';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  const data: ICountry[] = [
    { name: 'A', continent: 'AA', latlng: [], checked: false },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent, HeaderComponent, FooterComponent],
      imports: [],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
    component.countries = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display input and label', () => {
    const inputEl = el.querySelector('input') as HTMLInputElement;
    const labelEl = el.querySelector('label');
    expect(inputEl).toBeTruthy();
    expect(labelEl).toBeTruthy();
  });

  it('should call "continentChange" method', () => {
    const selectEl = el.querySelector('select') as HTMLSelectElement;
    spyOn(component, 'continentChange');
    selectEl.dispatchEvent(new Event('change'));
    expect(component.continentChange).toHaveBeenCalled();
  });

  it('should call "countryChange" method', () => {
    const inputEl = el.querySelector('input') as HTMLInputElement;
    spyOn(component, 'countryChange');
    inputEl.dispatchEvent(new Event('change'));
    expect(component.countryChange).toHaveBeenCalled();
  });

  it('should call "countryKeypress" method', () => {
    const checkboxEl = el.querySelector('.checkbox') as HTMLInputElement;
    spyOn(component, 'countryKeypress');
    checkboxEl.dispatchEvent(new Event('keypress'));
    expect(component.countryKeypress).toHaveBeenCalled();
  });

  it('should call "saveData" method', () => {
    const inputEl = el.querySelector('input') as HTMLInputElement;
    spyOn(component, 'saveData');
    inputEl.dispatchEvent(new Event('change'));
    expect(component.saveData).toHaveBeenCalled();
  });
});
