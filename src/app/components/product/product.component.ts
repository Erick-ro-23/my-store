import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: Producto = {
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

  @Output() addedProduct = new EventEmitter<Producto>();
  @Output() showProduct = new EventEmitter<string>();

  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method

  onAddtoCart() {
    this.addedProduct.emit(this.product);
  }
  onShowDetail() {
    this.showProduct.emit(this.product.id);
  }
}
