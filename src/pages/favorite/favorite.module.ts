import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoritePage } from './favorite';
import { ItemSliding } from 'ionic-angular';


@NgModule({
  declarations: [
    FavoritePage,
  ],
  imports: [
    IonicPageModule.forChild(FavoritePage),
  ],
})
export class FavoritePageModule {}
