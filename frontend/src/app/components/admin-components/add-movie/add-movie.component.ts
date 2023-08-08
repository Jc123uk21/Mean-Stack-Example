import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { AuthService } from 'src/app/security/auth-service.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit{

  //Set user logged in value to false
  isLoggedIn: boolean = false;

  //variable to hold loading attribute value
  loading = this.loadingService.loading;

  //declare variable to hold submitted value for registration form
  submitted: boolean = false;

  //Create form group for registration form
  form!: FormGroup;

  //Create user object to hold data collected from new movie form
  private movie: Movie = new Movie();

  //Create cast array to hold cast members of movie
  casts:String[] = [];
  constructor(private movieService: MovieService,private authService: AuthService,
    private loadingService: LoadingService,private router: Router, private formBuilder: FormBuilder){
}

//onSubmit method to handle new movie submitions via add new movie form
  onSubmit(){
    //set submitted variable to true
    this.submitted = true;
    //Set movie attribute variables to those collected from add movie form
    this.movie.title = this.form.get('title')?.getRawValue();
    this.movie.ageRating = this.form.get('ageRating')?.getRawValue();
    this.movie.genre= this.form.get('genre')?.getRawValue();
    this.movie.description = this.form.get('description')?.getRawValue();
    this.movie.cast = this.form.get('cast')?.getRawValue();
    this.movie.price = this.form.get('price')?.getRawValue();
    this.movie.userRating = 0;
    this.movie.imageUri = "./assets/icons/watching-a-movie.png";
    //Use the imported movie service's addNewMovie function with newly created movie as param
    this.movieService.AddNewMovie(this.movie).subscribe({
      next:data => {
        //Once new movie is added navigate user back to add-movie page
        this.router.navigateByUrl("movie/add");
    }
    });
  }

  //Method to add a cast member to the movie cast list via the add button on the form
  addCast(cast: string){
    this.casts.push(cast);
  }

  //Method to remove a cast member from the movie cast list via the remove button on the form
  removeCast(cast: string){
    const index: number = this.casts.indexOf(cast);
    if(index !== -1){
      this.casts.splice(index, 1);
    }

  }
  //set up new movie form on initilization of component
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title:"",
      ageRating: "",
      genre: "",
      description: "",
      cast:"",
      price: 0,
    })
  }
}
