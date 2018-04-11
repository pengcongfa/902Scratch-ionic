import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailPopoverPage } from './product-detail-popover';

@NgModule({
  declarations: [
    ProductDetailPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductDetailPopoverPage),
  ],
})
export class ProductDetailPopoverPageModule {}
