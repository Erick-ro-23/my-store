import { Injectable } from '@angular/core';
import { Producto } from '../models/product.model';
import { BehaviorSubject } from 'rxjs'; //implementa en patron de observable de Angular(otros componentes puedan subscribirse)

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private myShoppingCart: Producto[] = [];
  private myCart = new BehaviorSubject<Producto[]>([]); //creamos una variable privada que se pueda trnamitir a otros componentes y una lsita de productos[array] y comienza en vacia ([])

  myCart$ = this.myCart.asObservable();

  // Aqui tenemos toda la manipulacion de nuestro carrito de compras
  constructor() {}

  addProduct(product: Producto) {
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart); //para trnamitir a otro componentes
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }

  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}
