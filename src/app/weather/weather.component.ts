import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, Validators} from "@angular/forms";
import {GeolocationService} from '@ng-web-apis/geolocation';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  public currentWeather: any = <any>{};
  public description: string = '';
  public imagePath: string = '';
  public isRequestMade = false;
  public initialRequest = false;
  public notFoundErrorMessage: string | null = '';
  public appId = 'b2d87d0a8f37039eca8818b105641941';
  public form = this.fb.group({
    city: ['', Validators.required]
  })
  public currentDate = Date.now();

  constructor(private http: HttpClient, private fb: FormBuilder, private readonly geolocation$: GeolocationService) {
  }

  ngOnInit(): void {
    this.getPosition();
  }

  makeRequest() {
    let userCityInput = this.form.get('city')?.value?.toLowerCase();
    this.isRequestMade = true;
    if(this.form.valid) {
      this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${userCityInput}&appid=${this.appId}`).subscribe(
        (res) => {
          this.currentWeather = res;
          this.description = this.currentWeather.weather.description;
          this.imagePath = `http://openweathermap.org/img/wn/${this.currentWeather.weather[0].icon}@2x.png`;
        },
        (err) => {
          if(err.status == 404) {
            this.notFoundErrorMessage = 'City not found. Please try again.';
          }
        })
    }

    this.form.controls['city'].setErrors(null);
    this.notFoundErrorMessage = null;
    this.form.reset();
  }

  getPosition() {
    this.geolocation$.subscribe(position =>
    {
      let cityLatitude = position.coords.latitude;
      let cityLongitude = position.coords.longitude;
      this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?lat=${cityLatitude}&lon=${cityLongitude}&appid=${this.appId}`)
        .subscribe( (res) => {this.currentWeather = res;
          console.log(res);
      this.description = this.currentWeather.weather.description;
      this.imagePath = `https://openweathermap.org/img/wn/${this.currentWeather.weather[0].icon}@2x.png`;
        })
      this.initialRequest = true;
    })
  }
}
