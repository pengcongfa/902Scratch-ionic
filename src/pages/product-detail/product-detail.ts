import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {Http, Headers} from '@angular/http';
import {ProductDetailPopoverPage} from "../product-detail-popover/product-detail-popover";
import {AuthService} from "../../service/AuthService";
import {PersonalCenterPage} from "../personal-center/personal-center";
import {TreeViewComponent} from "../../components/tree-view/tree-view";
import {ChangeDetectorRef} from "@angular/core";

export class ProductDetail {
  id: string;
  name: string;
  author: string;
  create_time: string;
  update_time: string;
  file: string;
  image: string;
  hit: number;
  like: number;
  description: string;
  operation_instructions: string;
}

export class ProductInfo {
  favorite_count: number;
  if_like: boolean;
  if_favorite: boolean = false;
  tags: any;
}


@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})


export class ProductDetailPage {
  url: any;
  safe_url: any;
  production_segment;
  production_detail: ProductDetail;
  production_info: ProductInfo;
  logined : boolean = false;
  headers: Headers;
  comments: any;
  selfcomment: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitize: DomSanitizer, public http: Http,
              public popoverCtrl: PopoverController, public auth: AuthService, public changeDetectorRef:ChangeDetectorRef) {
    this.init();
    this.production_segment = "introduction";
  }

  init()
  {
    this.http.get("http://www.tuopinpin.com/mobile_api/production_detail/" + this.navParams.get("product_id") +'/').toPromise()
      .then((response) => {
        this.production_detail = response.json();
        if (!this.production_detail.description) this.production_detail.description = "此作品暂时还没有介绍！";
        if (!this.production_detail.operation_instructions) this.production_detail.operation_instructions = "此作品暂时还没有操作说明！";
        // this.url = "http://scratch.tuopinpin.com/mobile/index.html?" +
        // this.production_detail.file.split("http://www.tuopinpin.com")[1];
        this.url = "http://scratch.tuopinpin.com/mobile/index.html?" + this.production_detail.file;
        //this.url='http://192.168.1.102:8085/index.html';
        console.log("detail_url"+this.url);
        this.safe_url = this.sanitize.bypassSecurityTrustResourceUrl(this.url);
        console.log("this.safe_url"+this.safe_url);
      });

    this.http.get("http://www.tuopinpin.com/mobile_api/comment/production/" + this.navParams.get("product_id")).toPromise()
      .then((response) => {
        this.comments = response.json();
        console.log(this.comments);
      });

    let headers = new Headers();
    this.auth.getToken().then((value => {
      if (value) {
        headers.append('Authorization', 'Token ' + value);
        this.logined = true;
        this.http.get("http://www.tuopinpin.com/mobile_api/production_info/" + this.navParams.get("product_id") + '/',
          {headers: headers}).toPromise().then((response) => {
          this.production_info = response.json();
          console.log(response.json());
        });
      }
    }));


    this.auth.getToken().then(
      (value) => {if (!value) this.logined = false; else this.logined = true;});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(ProductDetailPopoverPage,this.production_detail);
    popover.present({
      ev: myEvent
    });
  }
  move_to_PersonalCenter()
  {
    this.navCtrl.push(PersonalCenterPage, {"username":this.production_detail.author})
  }

  subComment(){
    if(this.selfcomment.toString()!="") {

      var obj = {
        content_type: "production",
        object_pk: this.production_detail.id,
        comment: this.selfcomment.toString()
      }
      this.auth.getToken().then((value => {
        if (value) {
          let headers = new Headers();
          headers.append('Authorization', 'Token ' + value);
          this.http.post("http://www.tuopinpin.com/mobile_api/post_comment/", obj, {headers: headers}).toPromise().then(
            (response) => {
              console.log(response);
            }
          );
        }
      }));
      this.init();
      this.changeDetectorRef.detectChanges();
    }
  }

  doRefresh(refresher) {
    this.init();

    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}
