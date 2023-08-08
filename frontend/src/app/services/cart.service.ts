import { Injectable } from '@angular/core';
import { cart } from '../models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { cartItem} from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //Attributes
  private cart: cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<cart> = new BehaviorSubject(this.cart);
  private cartItm?:  cartItem;

  constructor() { }

  //Add movie to cart
  addToCart(movie: Movie){
    //check cartItem doesnt already exist in cart
    this.cartItm = this.cart.items
    .find(item => item.movie._id === movie._id);
    if(this.cartItm){
        return;
    }

    //save item to cart
    this.cart.items.push(new cartItem(movie));

    //save cart to localstorage
    this.storeCartToLocalStorage();
  }

  //remove movie from cart
  removeFromCart(movieId: string): void{
    this.cart.items = this.cart.items.filter(
      item => item.movie._id != movieId
    );

    //Save cart to localStorage
    this.storeCartToLocalStorage();
  }

  //Clear cart items
  clearCart(){
    //set cart to new cart
    this.cart = new cart();

    //Save cart to localStorage
    this.storeCartToLocalStorage();
  }

  //cart observable method
  getCartObservable(): Observable<cart>{
    return this.cartSubject.asObservable();
  }

  //Store cart in localStorage
  private storeCartToLocalStorage(): void{

    //set cart totalPrice attribute
    this.cart.totalPrice = this.cart.items.reduce(
      (preSum, currentItem) => preSum + currentItem.price, 0
    );

    //Set cart totalCount attribute
    this.cart.totalCount = this.cart.items.reduce(
      (preSum, currentItem) => preSum + currentItem.quantity, 0
    );

    //convert cart object to json string
    const cartJson = JSON.stringify(this.cart);

    //Store json string representing cart to local storage
    localStorage.setItem('cart', cartJson);

    //update cartSubject listerners
    this.cartSubject.next(this.cart);

  }

  //Retrieve cart from localStorage
  private getCartFromLocalStorage(): cart{

    //set cartJson to localStorage item 'cart'
    const cartJson = localStorage.getItem('cart');

    return cartJson ? JSON.parse(cartJson): new cart();

  }



}
