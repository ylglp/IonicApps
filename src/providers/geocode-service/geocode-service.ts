import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GeocodeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeocodeServiceProvider {

  data: any;
  apikey:String = 'AIzaSyBU6CjMDbvg4jSoTSfrhJQpBKbY3CvyGyk';

  constructor(public http: Http) {
    console.log('Hello GeocodeServiceProvider Provider');
    this.data = null;
  }

  getLatLong(address:string) {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+encodeURIComponent(address)+'&key='+ this.apikey)
        .map(res => res.json())
        .subscribe(data => {
          if (data.status === "OK") {
            //console.log('** data.status is OK. data: ' + JSON.stringify(data));
            resolve({name: data.results[0].formatted_address,
                     location: {
                       latitude: data.results[0].geometry.location.lat,
                       longitude: data.results[0].geometry.location.lng
                     }});          
          } else {
            console.log('** data.status is NOT OK: ' + JSON.stringify(data));
            //reject
          }
        })
    })
  }

}
