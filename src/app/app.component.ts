import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WeatherPage } from '../pages/weather/weather';
import { LocationsPage } from '../pages/locations/locations';
import { CurrentLoc } from '../interfaces/current-loc';
import { LocationsServiceProvider } from '../providers/locations-service/locations-service';
import { WeatherLocation } from '../interfaces/weather-location';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WeatherPage;

  pages: Array<{title: string, component: any, icon: string, loc?:CurrentLoc}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public locationsService: LocationsServiceProvider,
              public events: Events) {
    this.initializeApp();
    this.getMyLocations();
    /**
     * Option1: Events publish/listen approach
     * events.subscribe('locations:updated', (data) => {
     *  this.getMyLocations();
     * });
     */
 
    // used for an example of ngFor and navigation
    /**
    this.pages = [
      { title: 'Edit Locations', component: LocationsPage, icon: 'create' },
      { title: 'Current Location', component: WeatherPage, icon: 'pin' },
      { title: 'Cape Canaveral, FL', component: WeatherPage, icon: 'send', loc: {lat:28.3922, lon:-80.6077}},
      { title: 'San Francisco, CA', component: WeatherPage, icon: 'send', loc: {lat:37.7749, lon:-122.4194}},
      { title: 'Vancouver, BC', component: WeatherPage, icon: 'send', loc: {lat:49.2827, lon:-123.1207}},
      { title: 'Madison, WI', component: WeatherPage, icon: 'send', loc: {lat:43.0742365, lon:-89.381011899}}
    ];
     * 
     */
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.hasOwnProperty('loc')) {
      this.nav.setRoot(page.component, {geoloc: page.loc, title: page.title});
    }
    else {
      this.nav.setRoot(page.component, {title: page.title});
    }
  }

  getMyLocations() {
    /**
     // Option1: Events publish/listen approach
    this.locationsService.getLocations().then(res => {
      this.pages = [
        {title: 'Edit Locations', component: LocationsPage, icon: 'create' },
        { title: 'Current Location', component: WeatherPage, icon: 'pin' }
      ];
      for (let newLoc of res) {
        this.pages.push(newLoc);
      }
    });
    */


    // Option2: Observable approach:
    this.locationsService.locations$.subscribe((locs: Array<WeatherLocation>) => {
      this.pages = [
        {title: 'Edit Locations', component: LocationsPage, icon: 'create' },
        { title: 'Current Location', component: WeatherPage, icon: 'pin' }
      ];
      for (let newLoc of locs) {
        this.pages.push(newLoc);
      }
    });
  }

}
