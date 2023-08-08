import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { AddMovieComponent } from './components/admin-components/add-movie/add-movie.component';
import { AdminHomeComponent } from './components/admin-components/admin-home/admin-home.component';
import { DetailsComponent } from './components/user-components/details/details.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
{ path:"",
  component: HomeComponent
},
{
  path: "movies",
  component: MoviesComponent
},
{
  path:"movie/all",
  component: MovieListComponent
},
{
  path: "register",
  component: RegistrationComponent
},
{
  path:"login-page",
  component: LoginComponent
},
{
  path:"movie/add",
  component: AddMovieComponent
},
{
  path:"admin/home",
  component: AdminHomeComponent
},
{
  path: "user-profile",
  component: DetailsComponent
},
{
  path:"cart",
  component: CartComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
