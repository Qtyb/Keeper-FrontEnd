import { Component, Injector, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../core/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { 
  authService: AuthService;

  constructor(
    private spinner: NgxSpinnerService,
    private injector: Injector,
    ){ 
      this.authService = this.injector.get(AuthService)
    }    
        
    login() {     
      this.spinner.show();
      this.authService.login();
    }
    
    logout() {     
      this.spinner.show();
      this.authService.signout();
    } 

    ngOnInit() {
    }
}


 