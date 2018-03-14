import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';

import { CurrentLoc } from '../../interfaces/current-loc';
import { WeatherLocation } from '../../interfaces/weather-location';
import { LocationsServiceProvider } from '../../providers/locations-service/locations-service';
import { GeocodeServiceProvider } from '../../providers/geocode-service/geocode-service';
import { WeatherPage } from '../weather/weather';

/**
 * Generated class for the LocationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {
  locs: Array<WeatherLocation>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public locationsService: LocationsServiceProvider,
              public geocodeService: GeocodeServiceProvider,
              public alertCtrl: AlertController,
              public events: Events) {
    /**
     // Option1: Events publish/listen approach
      locationsService.getLocations().then(res => {
       this.locs = res;
      });
    */
   
    // Option2: Observable approach:
     locationsService.locations$.subscribe((locs: Array<WeatherLocation>) => {
       this.locs = locs;
     })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationsPage');
  }

  deleteLocation(loc:WeatherLocation) {
    this.locationsService.removeLocation(loc);
    // Option1: Events publish/listen approach
    // this.events.publish('locations:updated', {});
  }

  addLocation() {
    //console.log('addLocation');
    let prompt = this.alertCtrl.create({
      title: 'Add a City',
      message: "Enter the city's name",
      inputs: [
        {name: 'title',
         placeholder: 'City name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            console.log('Saved clicked');
            if (data.title != '') {
              this.geocodeService.getLatLong(data.title).then(res => {
                console.log('** new location is added: ' + res.name);
                let newLoc = {title:'',
                              component: WeatherPage,
                              icon: 'pin',
                              loc: {lat:0, lon:0}};
                newLoc.title = res.name;
                newLoc.loc.lat = res.location.latitude;
                newLoc.loc.lon = res.location.longitude;
                this.locationsService.addLocation(newLoc);
                // Option1: Events publish/listen approach
                // this.events.publish('locations:updated', {});
              }).catch(err => console.log("** getLatLong Exception: " + err.message));
            }
          }
        }
      ]
    });
    prompt.present();
  }

}
