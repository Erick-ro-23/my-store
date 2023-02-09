import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Producto } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { __param } from 'tslib';

@Component({
  selector: 'app-category',
  template:
    '<app-products [productId]="productId" [products]="products" (leadImgs)="loadMore($event)"></app-products>',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Producto[] = [];
  productId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = params.get('myId');
          if (this.categoryId) {
            return this.productsService.getByCategory(
              this.categoryId,
              this.limit,
              this.offset
            );
          }
          return [];
        })
      )
      .subscribe((data) => {
        this.products = data;
      });
    // Para leer los queryParams con id del producto:
    this.route.queryParamMap.subscribe((params) => {
      this.productId = params.get('product');
      console.log(this.productId);
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
