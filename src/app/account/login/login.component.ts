import { Component, Injector, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../core/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { 

  constructor(
    // private authService: AuthService, 
    private spinner: NgxSpinnerService,
    private injector: Injector,
    ) { }    
    
    title = "Login";
    
    login() {     
      this.spinner.show();
      const authService = this.injector.get(AuthService);
      authService.login();
    }   

    ngOnInit() {
    }
}


 