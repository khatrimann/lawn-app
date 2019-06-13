import { WeatherService } from './../services/weather.service';
import { AuthService } from '../services/auth.service';
import { LawnService } from './../services/lawn.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-lawn',
  templateUrl: './lawn.component.html',
  styleUrls: ['./lawn.component.css']
})
export class LawnComponent implements OnInit {

  id: string;
  lawnResult: any;
  dataPrecipitation: number[];
  dataTemperature: number[];
  latitude = -28.68352;
  longitude = -147.20785;
  mapType = 'hybrid';
  zoom = 11;
  displayid = 1;
  displaytype = 'Temperature';
  temp = undefined;
  windSpeed = undefined;

  public lineChartDataPrecipitation: ChartDataSets[] = [];
  public lineChartDataTemperature: ChartDataSets[] = [];

  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(private route: ActivatedRoute, private lawnService: LawnService, private authService: AuthService, private weatherService: WeatherService) {
    authService.loadUserCredentials();
    this.route.paramMap.subscribe(params => {

      let id = params.get('id');
      this.id = id;

      this.lawnService.getLawn(this.id).subscribe(result => {
        console.log('in result');
        console.log(result);
        if (result) {
          this.lawnResult = result;
        this.dataPrecipitation = this.lawnResult[0].precipitation.precipitation;
        this.dataTemperature = this.lawnResult[0].temperature.temperature;
        this.latitude = this.lawnResult[0].lat;
        this.longitude = this.lawnResult[0].long;
        weatherService.getWeather(this.latitude, this.longitude).subscribe(weatherObj => {
          this.windSpeed = weatherObj['wind']['speed'];
          this.temp = weatherObj['main']['temp'];
        });

        this.lineChartDataPrecipitation = [
          { data: this.dataPrecipitation, label: 'Series A' },
        ];

        this.lineChartDataTemperature = [
          { data: this.dataTemperature, label: 'Series A' },
        ];

        console.log(this.lineChartDataPrecipitation);
        console.log(this.lawnResult);
       }
       });
    });
  }

  ngOnInit() {  }

  next() {
    this.displayid += 1;
    if (this.displayid > 2) {
      this.displayid = 1;
    }
    if (this.displayid === 2) {
      this.displaytype = 'Precipitation';
    }
    if (this.displayid === 1) {
      this.displaytype = 'Temperature';
    }
  }

  prev() {
    this.displayid -= 1;
    if (this.displayid < 1) {
      this.displayid = 2;
    }

    if (this.displayid === 1) {
      this.displaytype = 'Temperature';
    }
    if (this.displayid === 2) {
      this.displaytype = 'Precipitation';
    }
  }

}
