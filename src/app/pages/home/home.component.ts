import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

import { Producto } from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Producto[] = [];
  limit = 10;
  offset = 0;
  runMoreImg = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    // this.loadMore();
    this.productsService.getProductsBypage(10, 0).subscribe((data) => {
      //vamos a traer la informacion lista que hayamos traido desde la API
      this.products = data;
    });
  }

  loadMore(runMoreImg: boolean) {
    this.productsService
      .getProductsBypage(this.limit, this.offset)
      .subscribe((data) => {
        //vamos a traer la informacion lista que hayamos traido desde la API
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }
}
