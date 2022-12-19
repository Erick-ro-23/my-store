import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';

import {
  Producto,
  CreateProductoDTO,
  UpdateProductDTO,
} from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import { da } from 'date-fns/locale';

// esto es de swiper nuevo que pruebo

import { ViewEncapsulation, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
// import Swiper core and required modules
import SwiperCore, { Mousewheel, Pagination } from 'swiper';
import { ThisReceiver } from '@angular/compiler';
import { pipe } from 'rxjs';
import { Title } from '@angular/platform-browser';

// install Swiper modules
SwiperCore.use([Mousewheel, Pagination]);
// hasta aqui es swiper prueba

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Producto[] = [];
  total = 0;
  products: Producto[] = [];
  showProductDetail = false;
  productChosen: Producto = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: '',
  };
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  today = new Date();
  date = new Date(2021, 2, 21);

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    // this.loadMore();
    this.productsService.getProductsBypage(10, 0).subscribe((data) => {
      //vamos a traer la informacion lista que hayamos traido desde la API
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Producto) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDatail() {
    this.showProductDetail = !this.showProductDetail;
  }
  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    // this.toggleProductDatail();
    this.productsService.getProduct(id).subscribe(
      (data) => {
        this.toggleProductDatail();
        this.productChosen = data;
        this.statusDetail = 'success';
      },
      (errorMsg) => {
        window.alert(errorMsg);
        this.statusDetail = 'error';
      }
    );
  }

  readAndUpdate(id: string) {
    this.productsService
      .getProduct(id)
      .pipe(
        switchMap((product) =>
          this.productsService.update(product.id, { title: 'change' })
        )
      );
    this.productsService
      .fetchReadAndUpdate(id, { title: 'change' })
      .subscribe((response) => {
        const read = response[0];
        const update = response[1];
      });
  }

  createNewProduct() {
    const product: CreateProductoDTO = {
      title: 'Nuevo producto',
      description: 'bla bla bla',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 1000,
      categoryId: 2,
    };
    this.productsService.create(product).subscribe((data) => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'change title',
    };
    const id = this.productChosen.id;
    this.productsService.update(id, changes).subscribe((data) => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(
        (item) => item.id == this.productChosen.id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }
  // paginacion cargando cada vez mas 10 elementos a nuestro arreglo
  loadMore() {
    this.productsService
      .getProductsBypage(this.limit, this.offset)
      .subscribe((data) => {
        //vamos a traer la informacion lista que hayamos traido desde la API
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }
}
