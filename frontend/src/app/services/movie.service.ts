import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { __await } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  movie!: Movie;
  private options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private readonly restUri: string ="http://localhost:5000";
  constructor(private http: HttpClient) { }

  //Get A list of all movies held within the database
  getAllMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.restUri +"/movie/all", this.options);
  }

  //Get a list of movies by their genre
  getAllMoviesByGenre(genre: string):Observable<Movie[]>{
    return this.http.get<Movie[]>(this.restUri +'/' + genre);
  }

  //Get a movie by its title
  getMovieByTitle(title: string): Observable<Movie>{
    return this.http.get<Movie>(this.restUri + '/movie/' + title, this.options);
  }

  //Add a movie to database
  AddNewMovie(movie: Movie):Observable<any>{
    return this.http.post(this.restUri + "/movie/add", movie, this.options);
  }

  //Set Movie attributes
  setMovie(movie:Movie){
    this.movie = movie;
  }

  //Get Movie attributes
  getMovie(): Movie{
    return this.movie;
  }
}
