import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth-service.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

   //variable to hold attribute for users logged in status
   isLoggedIn?: boolean;

   //variable to hold user role if they have on
   userRole?: string;

   //Set default cart quantity value
   cartQuantity = 0;

   constructor(private router: Router, private authService: AuthService,
                private cartService: CartService){

                  cartService.getCartObservable().subscribe((newCart)=>{
                    this.cartQuantity = newCart.totalCount;
                  })
   }

   //logout function called by logout button
   logout(){

     //call to autherisation service method to unauthenticate current logged in user
     this.authService.removeAuthentication();

     //Set the variable used to hold users logged in status to false
     this.isLoggedIn = false;

     //navigate user to the login page
     this.router.navigateByUrl("login-page");
   }

   ngOnInit(): void {
     /*check if a user is logged in via the authentication service and initialize the variable
     holding the logged in status attribute when this component is initialized
     */

       this.authService.getIsAuthenticated().subscribe({
         next:res => {
           this.isLoggedIn = res.valueOf()}
         });

         this.authService.getUserRole().subscribe({
          next: res =>{
            this.userRole = res;
          }
         })
   }
}
