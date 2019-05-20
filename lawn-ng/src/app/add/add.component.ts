import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  addr = {lat: 0, long: 0, address: ''};

  addLawnForm = new FormGroup({
    searchControl: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    zip: new FormControl(''),
    state: new FormControl(''),
    lat: new FormControl(''),
    long: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

  register() {
    console.log(this.addLawnForm.value);
  }

  addressChange(event) {
    console.log(event);
    console.log(event.target.value);
    let city, state;
    if (this.addr.address.split(', ')[-2]) {
      city = this.addr.address.split(', ')[-2];
    }
    if (this.addr.address.split(', ')[-3]) {
      state = this.addr.address.split(', ')[-3];
    }

    this.addLawnForm.patchValue({
      searchControl: this.addr.address,
      address: {
        city: city,
        state: state
      }
    });
    }

    public handleAddressChange(address: Address) {
      // Do some stuff
      console.log(address.geometry.location);
      console.log(address.formatted_address);
      this.addr.address = address.formatted_address;
      this.addr.lat = address.geometry.location.lat();
      this.addr.long = address.geometry.location.lng();

      let city, state, street;

      if (this.addr.address.split(', ')[this.addr.address.split(', ').length - 3]) {
        city = this.addr.address.split(', ')[this.addr.address.split(', ').length - 3];
      }
      if (this.addr.address.split(', ')[this.addr.address.split(', ').length - 2]) {
        state = this.addr.address.split(', ')[this.addr.address.split(', ').length - 2];
      }
      if (this.addr.address.split(', ')[0]) {
        street = this.addr.address.split(', ')[0];
      }

      this.addLawnForm.patchValue({
        searchControl: this.addr.address,
        address: {
          city: city,
          state: state,
          street: street,
          lat: this.addr.lat,
          long: this.addr.long
        }
      });
      }
}
