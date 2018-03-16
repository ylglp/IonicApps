import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Pro } from '@ionic/pro';
import { Injectable, Injector } from '@angular/core';

import { MyApp } from './app.component';
import { WeatherPage } from '../pages/weather/weather';
import { LocationsPage } from '../pages/locations/locations';
import { WebPage } from '../pages/web/web';
import { ToolsPage } from '../pages/tools/tools';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WeatherServiceProvider } from '../providers/weather-service/weather-service';
import { GeocodeServiceProvider } from '../providers/geocode-service/geocode-service';
import { LocationsServiceProvider } from '../providers/locations-service/locations-service';
import { WeathericonPipe } from '../pipes/weathericon/weathericon';

Pro.init('66411d65', {
  appVersion: '0.0.1'
})

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

@NgModule({
  declarations: [
    MyApp,
    WeathericonPipe,
    WeatherPage,
    LocationsPage,
    WebPage,
    ToolsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      menuType: 'overlay',
      platforms: {
        md: {
          menuType: 'reveal',
        }
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WeatherPage,
    LocationsPage,
    WebPage,
    ToolsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WeatherServiceProvider,
    GeocodeServiceProvider,
    LocationsServiceProvider,
    HTTP,
    InAppBrowser,
    IonicErrorHandler,
    [{ provide: ErrorHandler, useClass: MyErrorHandler }]    
  ]
})
export class AppModule {}
