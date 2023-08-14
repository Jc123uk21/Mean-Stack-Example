import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth-service.service';
import { LoadingService } from 'src/app/services/loading.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

   //variable to hold attribute for users logged in status
   isLoggedIn?: boolean;

   //variable to hold loading attribute value
   loading = this.loadingService.loading;

   //Create login form via new form group
   loginForm = this.formBuilder.group({
    username: '',
    password: ''
   });

   constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private router: Router, private loadingService: LoadingService){
  }

  ngOnInit(): void {
    /*check if a user is logged in via the authentication service and initialize the variable
       holding the logged in status attribute when this component is initialized
    */
    this.authService.getIsAuthenticated().subscribe({
      next: res => {this.isLoggedIn = res.valueOf()}
    });

  }

  onSubmit():void{
    this.authService.login(this.loginForm.get('username')?.getRawValue(),
    this.loginForm.get('password')?.getRawValue())
    .subscribe({
      next: data =>{
        localStorage.setItem('username', this.loginForm.get('username')?.getRawValue());
        console.log(localStorage.getItem('token'));
        this.authService.setAuthenticated(data);
        this.isLoggedIn = data.valueOf();
        const roles:string[] = data.roles;
        console.log(roles);
        //If the user is a normal user direct to the moive list page
        if(roles.includes('user')){
          this.router.navigateByUrl("movie/all");
        }
        //If the user is an admin user direct them to the admin home page
        else if(roles.includes('admin')){
          this.router.navigateByUrl("admin/home");
        }
        else if(roles.includes('superadmin')){
          this.router.navigateByUrl("superAdmin/home");
        }
      }
    }
    )
  }
}
