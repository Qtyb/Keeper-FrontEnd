import { Injectable } from '@angular/core';
 
@Injectable({
    providedIn: 'root'
})
export class ConfigService {    

    constructor() {}

    get authApiURI() {
        return 'http://localhost:7200/api';
    }    
     
    get resourceApiURI() {
        return 'http://localhost:7000/api';
    }  
}