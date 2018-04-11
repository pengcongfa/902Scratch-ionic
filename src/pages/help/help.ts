import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { DomSanitizer } from '@angular/platform-browser';
// import {Http} from '@angular/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  // url:any;
  // safe_url:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.url="http://www.baidu.com";
    // this.safe_url = sanitize.bypassSecurityTrustResourceUrl(this.url);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }
  // onTap(index)
  // {
  //   this.navCtrl.push(HelpPage, {index: index});
  // }


}
