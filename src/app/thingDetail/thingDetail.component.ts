import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ThingDto } from './thingDto';
import { UpdateThingDto } from './updateThingDto';
import { CreateThingDto } from './createThingDto';

@Component({
    selector: 'app-city-edit',
    templateUrl: './thingDetail.component.html',
    styleUrls: ['./thingDetail.component.css']
})

export class ThingDetailComponent {
    // the view title
    title: string;
    // the form model
    form: FormGroup;
    // the city object to edit or create
    thing: ThingDto;

    id?: number;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private http: HttpClient,

        @Inject('BASE_URL') private baseUrl: string) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl(''),
            value: new FormControl('')
        });

        this.loadData();
    }

    loadData() {
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
                .put<UpdateThingDto>(url, updatedThing)
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
                .post<CreateThingDto>(url, createThing)
                .subscribe(result => {
                    console.log("Thing " + createThing.name + " has been created.");
                    this.router.navigate(['/things']);
                }, error => console.log(error));
        }        
    }
}