import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/security/auth-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  //Set user logged in value to false
  isLoggedIn: boolean = false;

  //variable to hold loading attribute value
  loading = this.loadingService.loading;

  //declare variable to hold submitted value for registration form
  submitted: boolean = false;

  //Create form group for registration form
  form!: FormGroup;

  //Create new user object to hold collected registration details
  private user:User = new User();

  constructor(private authService: AuthService, private router: Router,
      private formBuilder: FormBuilder,private loadingService: LoadingService ){
  }


  //Create onSubmit function for registration form submition
  onSubmit(){
    this.submitted = true;

    //Create user from form inputs
    this.user.firstname = this.form.get('firstName')?.getRawValue();
    this.user.lastname = this.form.get('lastName')?.getRawValue();
    this.user.username =this.form.get('username')?.getRawValue();
    this.user.password =this.form.get('password')?.getRawValue();
    this.user.roles =["user"];
    this.user.isActive = true;


    this.authService.register(this.user)
    .subscribe({
        next: data=>{
          localStorage.setItem('username', this.form.get('username')?.getRawValue());
          //this.authService.setAuthenticated(data);
          console.log(data);
          this.router.navigateByUrl("login-page");
        }
      }
    );
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        firstName:"",
        lastName:"",
        username:"",
        password:"",
        roles: ['user']
      }
    );
  }
}
