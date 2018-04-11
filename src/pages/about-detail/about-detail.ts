import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the AboutDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-about-detail',
  templateUrl: 'about-detail.html',
})
export class AboutDetailPage {
  index: number;
  info = INFOS[1];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.index = Number(navParams.get("index"));
    this.info = INFOS[this.index];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutDetailPage');
  }

}

import {INFOS} from '../../app/infos'
