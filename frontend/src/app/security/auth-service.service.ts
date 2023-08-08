import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, observable, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs';
import { User } from '../models/user';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl: string = "http://localhost:5000";

  private isAuthenticated = new BehaviorSubject<boolean>(false);

  private options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private router: Router){
    this.isAuthenticated.next(false);
  }


  login(username:string, password:string): Observable<any>{
    return this.http.post<any>(this.authUrl + "/auth/user-login", {username,password}, this.options);
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  getIsAuthenticated():Observable<boolean>{
    return this.isAuthenticated.asObservable();
  }

  setAuthenticated(token: string){
    if(token !==null){
      const userToken = this.DecodeToken(token);
      console.log(userToken);
      localStorage.setItem('token', token);
      console.log(token);
      this.isAuthenticated.next(true);
    }
  }

  removeAuthentication(){
    if(localStorage.getItem('token') !==null){
     window.localStorage.clear();
     this.isAuthenticated.next(false);
    }
  }

  register(user: User): Observable<any>{
    return this.http.post<User>(this.authUrl + "/auth/register-user", user,this.options);
  }

  DecodeToken(token:string): any{
    try{
      return jwt_decode(token);
    }catch(Error ){
      return Error;
    }
  }
}
