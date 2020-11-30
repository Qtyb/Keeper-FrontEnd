import { Component, Inject, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { PlaceDto } from './placeDto';
import { UpdatePlaceDto } from './updatePlaceDto';
import { CreatePlaceDto } from './createPlaceDto';
import { AuthService } from '../core/authentication/auth.service';

@Component({
    selector: 'app-place-edit',
    templateUrl: './placeDetail.component.html',
    styleUrls: ['./placeDetail.component.css']
})

export class PlaceDetailComponent {
    title: string;
    form: FormGroup;
    place: PlaceDto;
    id?: number;
    authService: AuthService;

    constructor(
        private injector: Injector,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private http: HttpClient,

        @Inject('BASE_URL') private baseUrl: string) {
    }

    ngOnInit() {
        this.authService = this.injector.get(AuthService);
        this.form = new FormGroup({
            name: new FormControl(''),
            description: new FormControl('')
        });

        this.loadData();
    }

    loadData() {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': this.authService.authorizationHeaderValue
            })
          };

        this.id = +this.activatedRoute.snapshot.paramMap.get('id');
        if(this.id){
            var url = 'http://localhost:7100'+ '/gateway/places/' + this.id;
            this.http.get<PlaceDto>(url, httpOptions).subscribe(result => {
                this.place = result;
                this.title = "Edit - " + this.place.name;
                this.form.patchValue(this.place);
            }, error => console.error(error));
        }
        else{
            this.title = "Create a new Place";
        }        
    }

    onSubmit() {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': this.authService.authorizationHeaderValue
            })
          };

        if(this.id){
            var url = 'http://localhost:7100' + '/gateway/places/' + this.place.id;
            var updatedPlace :UpdatePlaceDto = {
                name: this.form.get("name").value,
                description: this.form.get("description").value,
                parentPlaceId: this.place.parentPlaceId
            };
            console.log(`Submit updatedPlace: ${updatedPlace} on url: ${url}`)
    
            this.http
                .put<UpdatePlaceDto>(url, updatedPlace, httpOptions)
                .subscribe(result => {
                    console.log("Place " + this.place.id + " has been updated.");
                    this.router.navigate(['/places']);
                }, error => console.log(error));
        }
        else{
            var url = 'http://localhost:7100' + '/gateway/places';
            var createPlace :CreatePlaceDto = {
                name: this.form.get("name").value,
                description:this.form.get("description").value,
                parentPlaceId: null
            };

            this.http
                .post<CreatePlaceDto>(url, createPlace, httpOptions)
                .subscribe(result => {
                    console.log("Place " + createPlace.name + " has been created.");
                    this.router.navigate(['/places']);
                }, error => console.log(error));
        }        
    }
}