import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import {LoginPage} from "../login/login";
import { Storage } from '@ionic/storage';
import {AboutDetailPage} from "../about-detail/about-detail";
import { NgIf } from '@angular/common';
import {AuthService} from "../../service/AuthService";
import {SettingPage} from "../setting/setting";
import {FavoritePage} from "../favorite/favorite";
import {AboutPage} from "../about/about";
import {HelpPage} from "../help/help";
import {PersonalCenterPage} from "../personal-center/personal-center";
import {Http} from "@angular/http";

@Component({
  selector: 'page-my',
  templateUrl: 'my.html'
})

export class MyPage {
  logined: boolean;
  username: string;
  PersonalImage:any;
  constructor(public navCtrl: NavController, public authservice: AuthService,public http:Http) {
    this.check_if_login();
    if(this.logined ==true) {
      this.http.get('http://www.tuopinpin.com/mobile_api/avatar/' + this.authservice.getUserName() + '/').toPromise().then((response) => {
        if (response.json().url != undefined)
          this.PersonalImage = response.json().url;
        else
          this.PersonalImage = "assets/img/user_img.png ";
        console.log(this.PersonalImage);
      });
    }
  }

  move_to_login(){
    this.navCtrl.push(LoginPage);
  }

  check_if_login()
  {
    this.authservice.getToken().then(
       (value) => {if (!value) this.logined = false; else this.logined = true;});
    this.authservice.getUserName().then(
      (val)=>{this.username = val},
      ()=>{this.username = ""}
    )
  }

  move_to_setting()
  {
    this.navCtrl.push(SettingPage);
  }

  move_to_about()
  {
    this.navCtrl.push(AboutPage)
  }
  move_to_help()
  {
    this.navCtrl.push(HelpPage)
  }
  logout()
  {
    this.authservice.logout();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  move_to_favorite()
  {
    this.navCtrl.push(FavoritePage);
  }
  move_to_PersonalCenter()
  {
    this.navCtrl.push(PersonalCenterPage, {"username":this.username})
  }

}
