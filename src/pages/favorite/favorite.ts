import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import {AuthService} from "../../service/AuthService";
import {ProductDetailPage} from "../product-detail/product-detail";

/**
 * Generated class for the FavoritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export class FavoriteProduct {
  id: string;
  name: string;
  author: string;
  image: string;
}


@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  favoriteList: FavoriteProduct[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: AuthService) {
    this.loadPage('http://www.tuopinpin.com/mobile_api/favorite_list/');
  }

  loadPage(pageUrl)
  {
    let currentPageData;
    let headers = new Headers();
    this.auth.getToken().then((value => {
      if(value)
        headers.append('Authorization', 'Token ' + value);
      this.http.get(pageUrl, {headers: headers})
        .toPromise().then((response) => {
        currentPageData = response.json();
        let results = currentPageData.results;
        for(let i=0;i< results.length;i++){
          this.favoriteList.push(results[i]);
        }
      });
    }));
  };

  move_to_production_detail(id: any){
    console.log(id);
    this.navCtrl.push(ProductDetailPage, {'product_id': id});
  }
  move_to_deletefavo()
  {

  }
}


