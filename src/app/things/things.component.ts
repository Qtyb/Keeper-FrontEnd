import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ThingListDto } from './thing';

@Component({
  selector: 'app-things',
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.css']
})
export class ThingsComponent implements OnInit {
  public things: ThingListDto[];

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { 
    }

  ngOnInit() {
    this.http.get<ThingListDto[]>('http://localhost:7100'+ '/gateway/things')
      .subscribe(result => {
        this.things = result;
      }, error => console.error(error));
  }

}
