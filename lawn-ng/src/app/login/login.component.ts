import { AuthServiceService } from './../services/auth-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';


declare var google;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  addr = {lat: 0, long: 0, address: ''};

  login = true;
  registered = false;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    searchControl: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      zip: new FormControl(''),
      state: new FormControl(''),
      lat: new FormControl(''),
      long: new FormControl('')
    })
  });

  constructor(private authService: AuthServiceService, private route: Router) { }


  ngOnInit() {

  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.loginForm.value);
    this.authService.logIn(this.loginForm.value).subscribe(res => {
      console.log(res);
      if (res.success) {
      this.route.navigate(['/home']);
    } else {
      console.log('Invalid');
    }
    });

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

    this.registerForm.patchValue({
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

    this.registerForm.patchValue({
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

  register() {
    console.log(this.registerForm.value);
    var values = {};

    Object.keys(this.registerForm.controls['address'].value).forEach((key) => {
      console.log(this.registerForm.controls['address'].get(key).value);
      // console.log(key);
      values[key] = this.registerForm.controls['address'].get(key).value;
  });

  Object.keys(this.registerForm.controls).forEach((key) => {
    console.log(key);
    values[key] = this.registerForm.get(key).value;
  });
  delete values['address'];
  console.log(values);

  this.authService.signUp(values).subscribe(res => {
    if (res) {
      this.registered = res;
      console.log('Registration successful');
      this.registerForm.reset();
    } else {
      console.log('Registration unsuccessful');
    }
    console.log(res);
  });
  }

}
