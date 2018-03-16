import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

@Component({
  selector: 'page-web',
  templateUrl: 'web.html'
})
export class WebPage {
  url: string;  

  constructor(public navCtrl: NavController, private inAppBrowser: InAppBrowser) {
    //this.url = "http://192.168.1.104/LPOM/lpac/signin";
    this.url = "http://google.com";
  }

  openWebpage(url: string) {
    const options: InAppBrowserOptions = {
      zoom: 'yes'
    }
    // Opening a URL and returning an InAppBrowserObject
    //const browser = this.inAppBrowser.create(url, '_blank', options);

    const browser = this.inAppBrowser.create(url, '_blank', 'location=yes');
    browser.show();

    const watchLoadStart = browser.on('loadstart').subscribe(function(event){
      console.log('loadstart');
    });

    const watchLoadStop = browser.on('loadstop').subscribe(function(event){
      console.log('loadstop');
    });

    const watchLoadError = browser.on('loaderror').subscribe(function(event){
      console.log('loaderror');
    });

   // Inject scripts, css and more with browser.X
  }      
}
