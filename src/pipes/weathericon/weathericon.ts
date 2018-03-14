import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the WeathericonPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'weathericon',
})
export class WeathericonPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, args: any[]) {
    let newIcon : string = 'sunny';
    let forecastNames: Array<string> = ["clear-day", "clear-night", "rain", "snow", "sleet", "wind", "fog", "cloudy", "partly-cloudy-day", "partly-cloudy-night"];
    let ioniconNames: Array<string> = ["sunny", "moon", "rainy", "snow", "snow", "cloudy", "cloudy", "cloudy", "partly-sunny", "cloudy-night"];
    let iconIndex: number = forecastNames.indexOf(value);
    if (iconIndex !== -1) {
      newIcon = ioniconNames[iconIndex];
    }
    return newIcon;
  }
}
