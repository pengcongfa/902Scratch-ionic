import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * Generated class for the ChapterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@Component({
  selector: 'page-chapter',
  templateUrl: 'chapter.html',
})
export class ChapterPage {

  lesson_id: any;
  chapter_id: any;
  infos: any;
  audio_src: any;
  content: any;
  audio = new Audio();
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
              private sanitize: DomSanitizer, public toastCtrl : ToastController) {
    this.lesson_id = Number(navParams.get("lesson_id"));
    this.chapter_id = Number(navParams.get("chapter_id"));
    this.loadPage();
  }

  loadPage()
  {
    this.http.get("http://www.tuopinpin.com/course/" + this.lesson_id + '/' + this.chapter_id + '/').toPromise().then((response) => {
      this.content = this.sanitize.bypassSecurityTrustHtml(response.text());
    }, (error)=>{
      console.log(error);
    });
    this.http.get('http://www.tuopinpin.com/course_info/' + this.lesson_id + '/' + this.chapter_id + '/')
      .toPromise().then((response) => {
      this.infos = response.json()[0];
      console.log(this.infos);
      if(this.infos && this.infos.audio != undefined)
      {
        this.audio_src = this.infos.audio;
        this.audio.src = this.audio_src;
        this.audio.load();
      }
    });
  }

  playSound()
  {
    if(this.audio.paused) {
      this.audio.play();
    }
    else {
      this.audio.pause();
    }
  }

  swipeEvent(event) {
    console.log(event);
    //向左滑
    if(event.direction == 2) {
      if(this.infos.next)
        this.chapter_id += 1;
      else
        this.presentToast("已经到头了");
      this.loadPage();
    }
    //向右滑
    if(event.direction ==4) {
      if(this.infos.previous)
        this.chapter_id -= 1;
      else
        this.presentToast("已经到头了");
      this.loadPage();
    }
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }

}
