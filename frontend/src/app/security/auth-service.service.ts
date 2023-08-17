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

  //Set server base uri
  private authUrl: string = "http://localhost:5000";

  //Set user authentication
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  //Set user role
  private userRole = new BehaviorSubject<string>("");

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

  //Get user authenticaion
  getIsAuthenticated():Observable<boolean>{
    return this.isAuthenticated.asObservable();
  }


 //Set User authentication
  setAuthenticated(token: string){
    if(token !==null){
      console.log(token);
      localStorage.setItem('token', token);
      console.log(token);
      this.isAuthenticated.next(true);
    }
  }

  //Remove user authentication
  removeAuthentication(){
    if(localStorage.getItem('token') !==null){
     window.localStorage.clear();
     this.isAuthenticated.next(false);
     this.removeUserRole();
    }
  }

  //Set user role
  setUserRole(role: string){
    this.userRole.next(role);
  }

  //Get User role
  getUserRole(){
    return this.userRole.asObservable();
  }

  //Remove user role
  removeUserRole(){
    this.setUserRole("");
  }

  //Register new user
  register(user: User): Observable<any>{
    return this.http.post<User>(this.authUrl + "/auth/register-user", user,this.options);
  }

  //Decode jwt token
  DecodeToken(token:string): any{
    try{
      return jwt_decode(token, {header: true});
    }catch(Error ){
      return Error;
    }
  }
}
