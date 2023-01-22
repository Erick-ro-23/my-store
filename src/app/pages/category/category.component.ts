import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Producto } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Producto[] = [];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => (this.categoryId = params.get('myId'))
    );
    if (this.categoryId) {
      this.productsService
        .getByCategory(this.categoryId, this.limit, this.offset)
        .subscribe((data) => {
          this.products = data;
        });
    }
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
