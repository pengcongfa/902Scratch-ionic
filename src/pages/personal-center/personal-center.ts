import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import {AuthService} from "../../service/AuthService";
import {ProductDetailPage} from "../product-detail/product-detail";
/**
 * Generated class for the PersonalCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


export class personal_productlist
{
  id: string;
  name: string;
  author: string;
  image: string;
}
export class personal_info
{
  username:string;
  info_name:string;
  sex:string;
  grade:string;
  created_at:string;
  self_introduction:string;
}

@IonicPage()
@Component({
  selector: 'page-personal-center',
  templateUrl: 'personal-center.html',
})
export class PersonalCenterPage {
    PersonalProductlist:personal_productlist[]=[];
    PersonalInfo:personal_info;
    PersonalImage:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: AuthService) {
    this.loadPage('http://www.tuopinpin.com/mobile_api/user_production_list/'+this.navParams.get('username')+'/');
     this.http.get('http://www.tuopinpin.com/mobile_api/user_info/'+this.navParams.get('username')+'/').toPromise().
     then((response) => {
       this.PersonalInfo = response.json();
       console.log(this.PersonalInfo);
     });
    this.http.get('http://www.tuopinpin.com/mobile_api/avatar/'+this.navParams.get('username')+'/').toPromise().
    then((response) => {
      if(response.json().url != undefined)
        this.PersonalImage = response.json().url;
      else
        this.PersonalImage = "assets/img/user_img.png ";
      console.log(this.PersonalImage);
    });

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
          this.PersonalProductlist.push(results[i]);
        }
        console.log(this.PersonalProductlist);

      });
    }));
  };
  move_to_production_detail(id: any){
    console.log(id);
    this.navCtrl.push(ProductDetailPage, {'product_id': id});
  }

    // ionViewDidLoad()
    // {
    //   console.log('ionViewDidLoad PersonalCenterPage');
    // }

  // show_personal_info() {
  //   this.http.get("http://www.tuopinpin.com/mobile_api/user_production_list/" + this.navParams.get("username")).toPromise()
  //     .then((response) => {
  //       this.personal_center = response.json()
  //     });
  // }
  //
  // show_product_list(){
  //
  // }
  }

