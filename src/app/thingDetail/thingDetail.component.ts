import { Component, Inject, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ThingDto } from './thingDto';
import { UpdateThingDto } from './updateThingDto';
import { CreateThingDto } from './createThingDto';
import { AuthService } from '../core/authentication/auth.service';

@Component({
    selector: 'app-thing-edit',
    templateUrl: './thingDetail.component.html',
    styleUrls: ['./thingDetail.component.css']
})

export class ThingDetailComponent {
    title: string;
    form: FormGroup;
    thing: ThingDto;
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
            value: new FormControl('')
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
            var url = 'http://localhost:7100'+ '/gateway/things/' + this.id;
            this.http.get<ThingDto>(url).subscribe(result => {
                this.thing = result;
                this.title = "Edit - " + this.thing.name;
                
                this.form.patchValue(this.thing);
            }, error => console.error(error));
        }
        else{
            this.title = "Create a new Thing";
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
            var url = 'http://localhost:7100' + '/gateway/things/' + this.thing.id;
            var updatedThing :UpdateThingDto = {
                name: this.form.get("name").value,
                CategoryId: 1,
                CurrencyId: 1,
                description: this.thing.description,
                value: +this.form.get("value").value
            };
            console.log(`Submit updatedThing: ${updatedThing} on url: ${url}`)
    
            this.http
                .put<UpdateThingDto>(url, updatedThing, httpOptions)
                .subscribe(result => {
                    console.log("Thing " + this.thing.id + " has been updated.");
                    this.router.navigate(['/things']);
                }, error => console.log(error));
        }
        else{
            var url = 'http://localhost:7100' + '/gateway/things';
        

            var createThing :CreateThingDto = {
                name: this.form.get("name").value,
                CategoryId: 1,
                CurrencyId: 1,
                description: "",
                value: +this.form.get("value").value
            };

            this.http
                .post<CreateThingDto>(url, createThing, httpOptions)
                .subscribe(result => {
                    console.log("Thing " + createThing.name + " has been created.");
                    this.router.navigate(['/things']);
                }, error => console.log(error));
        }        
    }
}