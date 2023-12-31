import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { AuthService } from 'src/app/security/auth-service.service';
import { CartService } from 'src/app/services/cart.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{

  //Attribute variables
  isLoggedIn?:boolean;

  movie!: Movie;
  movies!: Movie[];

  //constructor
  constructor(private authService: AuthService, private movieService: MovieService,
  private cartService: CartService, private router: Router){}

  //add movie to cart
  addToCart(movie: Movie){

     this.movie = movie;
     console.log(this.movie);
    //Add movie to cart
    this.cartService.addToCart(this.movie);
    //route user to cart page
    this.router.navigateByUrl('/cart');
  }

  //More information function to route to movie information page
  moreInfo(movie:Movie){
    this.movieService.setMovie(movie);
    this.router.navigateByUrl('/movie/' + movie.title);
  }

  ngOnInit(): void {
    this.authService.getIsAuthenticated().subscribe({
      next:res => {
        this.isLoggedIn = res.valueOf()}
      });

    this.movieService.getAllMovies().subscribe(data =>{
        this.movies = data;
    })
  }
}
