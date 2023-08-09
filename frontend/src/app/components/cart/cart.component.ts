import { Component, OnInit } from '@angular/core';
import { cart } from 'src/app/models/cart';
import { cartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
 cart!: cart;

 constructor(private cartservice: CartService){
    this.cartservice.getCartObservable().subscribe((cart) =>{
      this.cart = cart;
    })
 }
  ngOnInit(): void {

  }

  removeFromCart(item: cartItem){
    this.cartservice.removeFromCart(item.movie._id);
  }



}
