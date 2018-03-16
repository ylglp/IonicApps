import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Refresher } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

import { WeatherServiceProvider } from '../../providers/weather-service/weather-service';
import { CurrentLoc } from '../../interfaces/current-loc';

/**
 * Generated class for the WeatherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {
  theWeather: any = {};
  currentData: any = {};
  day1: any = {};
  day2: any = {};
  day3: any = {};
  loader: LoadingController;
  refresher: Refresher;
  currentLoc: CurrentLoc = {lat:0, lon:0};
  pageTitle: string = 'Current Location';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public weatherService: WeatherServiceProvider,
              public loadingCtrl: LoadingController,
              public geolocation: Geolocation,
              public storage: Storage) {

      let loader = this.loadingCtrl.create({
        content: "Loading weather data ...",
        duration: 2000
      });
      loader.present();

      let loc: CurrentLoc = null;
      if (this.navParams !== undefined) {
        loc = this.navParams.get('geoloc');
        this.pageTitle = this.navParams.get('title');
      }
      if (loc === undefined) {
        this.pageTitle = "Current Location";
        console.log("constructor: loc is undefined");
        geolocation.getCurrentPosition().then(pos => {
          console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
          this.currentLoc.lat = pos.coords.latitude;
          this.currentLoc.lon = pos.coords.longitude;
          this.currentLoc.timestamp = pos.timestamp;
          
          // set a key/value
          storage.set("CurrentLocationLat", this.currentLoc.lat);
          storage.set("CurrentLocationLon", this.currentLoc.lon);
 
          return this.currentLoc;
        }).then(currentLoc => {
          this.weatherService.getWeather(currentLoc).then(theResult => {
            this.theWeather = theResult;
            this.currentData = this.theWeather.currently;
            this.day1 = this.theWeather.daily.data[0];
            this.day2 = this.theWeather.daily.data[1];
            this.day3 = this.theWeather.daily.data[2];
            });
          
        }).catch(err => console.log("** WeatherPage Exception: " + err.message)); 
      }
      else {
        this.currentLoc = loc;
        this.weatherService.getWeather(this.currentLoc).then(theResult => {
          this.theWeather = theResult;
          this.currentData = this.theWeather.currently;
          this.day1 = this.theWeather.daily.data[0];
          this.day2 = this.theWeather.daily.data[1];
          this.day3 = this.theWeather.daily.data[2];
        });
      }
            // get key/value pair
            storage.get('CurrentLocationLat').then((val) => {
              console.log('CurrentLocationLat in storage: ' + val);
            })

      
      loader.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeatherPage');
  }

  doRefresh(refresher) {
    this.weatherService.getWeather(this.currentLoc).then(theResult => {
      this.theWeather = theResult;
      this.currentData = this.theWeather.currently;
      this.day1 = this.theWeather.daily.data[0];
      this.day2 = this.theWeather.daily.data[1];
      this.day3 = this.theWeather.daily.data[2];

            // get key/value pair
            this.storage.get('CurrentLocationLat').then((val) => {
              console.log('CurrentLocationLat in storage: ' + val);
            })

      refresher.complete();
    });
  }

}
