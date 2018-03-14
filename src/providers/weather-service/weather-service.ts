import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { CurrentLoc } from '../../interfaces/current-loc';

/*
  Generated class for the WeatherServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherServiceProvider {
  data: any = null;

  constructor(public http: Http, public platform: Platform) {
    console.log('Hello WeatherServiceProvider Provider');
  }

  load(currentLoc: CurrentLoc) {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      let apiURL:string = 'https://api.darksky.net/forecast/e542b689b461473106dfd91d42554991/';
      //apiURL = '/api/forecast/';  // enable proxy for testing

      //this.http.get('/api/forecast/' + currentLoc.lat + ',' + currentLoc.lon)
      this.http.get(apiURL + currentLoc.lat + ',' + currentLoc.lon)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getWeather(currentLoc: CurrentLoc) {
    this.data = null;
    return this.load(currentLoc).then(data => {
      return data;
    });
  }
}
