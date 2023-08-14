import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { request } from 'express';
import { Movie } from 'src/app/models/movie';
import { AuthService } from 'src/app/security/auth-service.service';
import { CartService } from 'src/app/services/cart.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit{


  //Attribute variables

  //variable to hold logged in status
  isLoggedIn?:boolean;

  //variable to hold
  movie: Movie = new Movie();

  //constructor
  constructor(private authService: AuthService, private movieService: MovieService,
  private cartService: CartService, private router: Router){
    this.movie = this.movieService.getMovie();
  }

  //add movie to cart
  addToCart(movie: Movie){
    this.movie = movie;
    console.log(this.movie);
   //Add movie to cart
   this.cartService.addToCart(this.movie);
   //route user to cart page
   this.router.navigateByUrl('/cart');
 }

  ngOnInit(){

    //Set the users logged in status to the value held by the authentication service attribute isLoggedIn
    this.authService.getIsAuthenticated().subscribe({
      next:res => {
        this.isLoggedIn = res.valueOf()}
    });
  }
}
