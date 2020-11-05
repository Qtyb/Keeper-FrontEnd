import { Component, OnInit, Inject, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../core/authentication/auth.service';
import { ThingListDto } from './thing';

@Component({
  selector: 'app-things',
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.css']
})
export class ThingsComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'value', 'currencyCode', 'categoryName'];
  public things: ThingListDto[];

  constructor(
    private injector: Injector,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { 
    }

  ngOnInit() {
    const authService = this.injector.get(AuthService);
    this.GetThings(authService.authorizationHeaderValue);
  }

  private GetThings(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    console.log("THINGS REQUEST")
    console.log(httpOptions)
    this.http.get<ThingListDto[]>('http://localhost:7100'+ '/gateway/things', httpOptions)
      .subscribe(result => {
        this.things = result;
      }, error => console.error(error));
  }

}
