import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  countries = [
    {
      "name": "Aruba",
      "continent": "North America",
      "latlng": [
        "12.5",
        "-69.96666666"
      ]
    },
    {
      "name": "Afghanistan",
      "continent": "Asia",
      "latlng": [
        "33",
        "65"
      ]
    }
  ];

  selectedCountries: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.selectedCountries = this.fb.group({
      userSelectedCountries: this.fb.array([])
    });
  }

  onChange(name: string, isChecked: boolean){

    const selectedCountriesArray = <FormArray>this.selectedCountries.controls.userSelectedCountries;

    if(isChecked){
      selectedCountriesArray.push(new FormControl(name));
    }else{
      let index = selectedCountriesArray.controls.findIndex(x => x.value == name);
      selectedCountriesArray.removeAt(index);
    }

    console.log(selectedCountriesArray.value);


  }
}
