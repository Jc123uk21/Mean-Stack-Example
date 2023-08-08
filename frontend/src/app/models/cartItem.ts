import { Movie } from "./movie";

export class cartItem{

  constructor(public movie: Movie){}

  quantity: number = 1;
  price: number = this.movie.price;
}
