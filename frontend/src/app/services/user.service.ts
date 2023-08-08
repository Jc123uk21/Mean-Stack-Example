import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly restUri: string ="http://localhost:5000";
  constructor(private http: HttpClient) { }


}
