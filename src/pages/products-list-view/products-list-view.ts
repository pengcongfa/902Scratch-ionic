import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, NavParams, ToastController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {ProductDetailPage} from "../product-detail/product-detail";
import {SettingService} from "../../service/SettingService";
import { NgIf } from '@angular/common';

/**
 * Generated class for the ProductsListViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export class Product {
  id: string;
  name: string;
  author: string;
  create_time: string;
  update_time: string;
  image: string;
  hit: number;
  like: number;
}


@Component({
  selector: 'page-products-list-view',
  templateUrl: 'products-list-view.html',
})
export class ProductsListViewPage {


  size: number = 20;
  currentPage: string = 'http://www.tuopinpin.com/mobile_api/production_list/?page=1';
  nextPage: string;
  previousPage: string;
  currentPageData: any;
  products: Product[] = [];
  keyword: string;
  disable_img: boolean = false;
  cssname: string;

  orderType: string = "time-Order";
  constructor(public navCtrl: NavController, public http:Http, private popoverCtrl: PopoverController, public navParams: NavParams,
              public settingService: SettingService, public toastCtrl: ToastController) {
    this.loadPage(this.currentPage, this.size);

  }

  setting()
  {
    this.settingService.get_disable_img().then((value => {
      this.disable_img = value;
    }));
    this.settingService.get_disable_animation().then((value => {
      if (value) {
        this.cssname = "";
      } else
        this.cssname = "animated bounceIn";
    }));
  }

  loadPage(pageUrl, size)
  {
    this.setting();
    this.http.get(pageUrl)
      .toPromise().then((response) => {
      this.currentPageData = response.json();

      var results = this.currentPageData.results;

      for(var i=0;i< results.length;i++){
        this.products.push(results[i]);
      }

      this.nextPage = this.currentPageData.next;
      this.previousPage=this.currentPageData.previous;

    });
  }

  infiniteScroll(infiniteScrollEvent)
  {
    if(this.nextPage) {
      setTimeout(() => {
        this.currentPage=this.nextPage;
        this.loadPage(this.currentPage, this.size);
        infiniteScrollEvent.complete();
      },500);
    }else
    {
      let toast = this.toastCtrl.create({
        message: '没有更多了!',
        duration: 1000,
        position: 'bottom'
      });
      setTimeout(() => {
        infiniteScrollEvent.complete();
        toast.present();
      }, 500);
    }
  }


  onTap(id)
  {
    this.navCtrl.push(ProductDetailPage, {product_id: id});
    console.log(id);
  }

  search(q: string) {
    this.products = [];
    this.keyword = q;
    this.currentPage = "http://www.tuopinpin.com/mobile_api/production_list/?search=" + q;
    this.loadPage(this.currentPage, this.size);
  }

  orderShow(){
    this.products = [];
    if(this.orderType=="time-Order"){
      this.currentPage = "http://www.tuopinpin.com/mobile_api/production_list/?page=1" ;
    }
    if(this.orderType=="name-Order"){
      this.currentPage = "http://www.tuopinpin.com/mobile_api/production_list/?ordering=name" ;
    }
    if(this.orderType=="hit-Order"){
      this.currentPage = "http://www.tuopinpin.com/mobile_api/production_list/?ordering=-hit";
    }
    if(this.orderType=="like-Order"){
      this.currentPage = "http://www.tuopinpin.com/mobile_api/production_list/?ordering=-like";
    }

    this.loadPage(this.currentPage, this.size);
  }

  doRefresh(refresher) {
    this.products = [];
    this.currentPage = "http://www.tuopinpin.com/mobile_api/production_list/?page=1";
    this.loadPage(this.currentPage, this.size);

    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }


  ionViewDidLoad(){
  console.log('ionViewDidLoad ProductsListViewPage');
  }

}
