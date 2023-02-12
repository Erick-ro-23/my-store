import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { HighlightDirective } from './directives/highlight.directive';
import { ImgComponent } from '../shared/components/img/img.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent,
    ImgComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
  ],
  imports: [CommonModule, RouterModule, SwiperModule],
  exports: [
    ProductComponent,
    ProductsComponent,
    ImgComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
  ],
})
export class SharedModule {}
