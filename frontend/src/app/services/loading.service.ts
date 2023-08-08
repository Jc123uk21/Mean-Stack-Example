import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoading = new BehaviorSubject<boolean>(false);
  public readonly loading = this.isLoading.asObservable();

  constructor() { }

  showLoading(){
    this.isLoading.next(true);
  }

  hideLoading(){
    this.isLoading.next(false);
  }
}
