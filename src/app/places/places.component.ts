import { Component, OnInit, Inject, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../core/authentication/auth.service';
import { PlaceListDto } from './place';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name'];
  public places: PlaceListDto[];

  constructor(
    private injector: Injector,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { 
    }

  ngOnInit() {
    const authService = this.injector.get(AuthService);
    this.GetPlaces(authService.authorizationHeaderValue);
  }

  private GetPlaces(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    this.http.get<PlaceListDto[]>('http://localhost:7100'+ '/gateway/places', httpOptions)
      .subscribe(result => {
        this.places = result;
      }, error => console.error(error));
  }

}
