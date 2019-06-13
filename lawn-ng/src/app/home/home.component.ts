import { WeatherService } from './../services/weather.service';
import { AddressService } from './../services/address.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { LawnService } from '../services/lawn.service';

declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  @ViewChild('modal') successModal: ElementRef;
  @ViewChild('lawnAddModal') addModal: ElementRef;
  @ViewChild('toast') toast: ElementRef;

  id: Subject<string> = undefined;
  username: string = undefined;
  subscription: Subscription;
  isAuthenticated: Boolean;
  lawns: any;
  modal = false;
  // searchControl = new FormControl('');
  windSpeed = undefined;
  temp = undefined;
  success = true;

  addr = {lat: 0, long: 0, address: ''};

  addLawnForm = new FormGroup({
    searchControl: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    zip: new FormControl(''),
    state: new FormControl(''),
    lat: new FormControl(''),
    long: new FormControl(''),
    user: new FormControl(''),
    precipitation: new FormControl(''),
    temperature: new FormControl('')
  });
  constructor(private authService: AuthService, private addressService: AddressService, private lawnService: LawnService, private weatherService: WeatherService, private renderer: Renderer2) {
    this.authService.loadUserCredentials();
    this.addressService.getLawns().subscribe(object => { this.lawns = object['lawns']; console.log(this.lawns);
    weatherService.getWeather(object['address']['lat'], object['address']['long']).subscribe(weatherObj => {
      this.windSpeed = weatherObj['wind']['speed'];
      this.temp = weatherObj['main']['temp'];
    });
    });
   }

   generatePrecipitation(): number[] {
    let prec = [];
    for (let i = 0; i < 12; i++) {
      prec.push(Math.floor(Math.random() * 128) + 0  );
    }
    return prec;
  }

  generateTemperature(): number[] {
    let temp = [];
    for (let i = 0; i < 12; i++) {
      temp.push(Math.floor(Math.random() * 50) + 30  );
    }
    return temp;
  }

  ngOnInit() {
    this.authService.loadUserCredentials();
    // this.id = this.authService.id;
    this.addLawnForm.patchValue({
      user: this.id,
      precipitation: this.generatePrecipitation(),
      temperature: this.generateTemperature(),

    });
    // console.log(this.id);
    this.addressService.getLawns().subscribe(object => { this.lawns = object['lawns'];
      console.log(this.lawns); });
  }

  print(query: any) {
    console.log(query);
  }


  register() {
    console.log(this.addLawnForm.value);
    this.lawnService.pushLawn(this.addLawnForm.value).subscribe(res => {
      if (res.success) {
      console.log(res);
      this.success = true;
      $(this.successModal.nativeElement).modal('show');
      $(this.addModal.nativeElement).modal('hide');
    } else {
      console.log(res.success);
      $(this.toast.nativeElement).toast('show');
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
          city: city,
          state: state,
          street: street,
          lat: this.addr.lat,
          long: this.addr.long
      });
      }


}
