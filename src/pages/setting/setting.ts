import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  public disable_img: boolean = false;
  public disable_animation: boolean = false;
  public disable_swipe: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    storage.ready().then(()=>{
      storage.get("disable_img").then((val)=>{
        this.disable_img = val;
      });
      storage.get("disable_animation").then(val=>{
        this.disable_animation = val;
      });
      storage.get("disable_swipe").then(val => {
        this.disable_swipe = val;
      });
    })
  }

  change_disable_img()
  {
    this.storage.set('disable_img', this.disable_img);
  }

  change_disable_animation()
  {
    this.storage.set('disable_animation', this.disable_animation);
  }

  change_disable_swipe()
  {
    this.storage.set('disable_swipe', this.disable_swipe);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

}
