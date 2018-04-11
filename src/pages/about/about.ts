import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AboutDetailPage} from "../about-detail/about-detail"
import {INFOS} from '../../app/infos'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {

  constructor(public navCtrl: NavController) {
  }

  infos = INFOS;

  onTap(index)
  {
    this.navCtrl.push(AboutDetailPage, {index: index});
  }

}
