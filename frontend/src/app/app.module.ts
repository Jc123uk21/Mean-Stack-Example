import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AdminHomeComponent } from './components/admin-components/admin-home/admin-home.component';
import { AddMovieComponent } from './components/admin-components/add-movie/add-movie.component';
import { DeleteMovieComponent } from './components/admin-components/delete-movie/delete-movie.component';
import { UpdateMovieComponent } from './components/admin-components/update-movie/update-movie.component';
import { RegisterAdminComponent } from './components/admin-components/register-admin/register-admin.component';
import { RemoveAdminComponent } from './components/admin-components/remove-admin/remove-admin.component';
import { DetailsComponent } from './components/user-components/details/details.component';
import { UpdateDetailsComponent } from './components/user-components/update-details/update-details.component';
import { LoadingInterceptor } from './config/loading.interceptor';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MoviesComponent,
    MovieListComponent,
    RegistrationComponent,
    LoginComponent,
    SpinnerComponent,
    AdminHomeComponent,
    AddMovieComponent,
    DeleteMovieComponent,
    UpdateMovieComponent,
    RegisterAdminComponent,
    RemoveAdminComponent,
    DetailsComponent,
    UpdateDetailsComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
