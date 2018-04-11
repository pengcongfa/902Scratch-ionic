import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {ChapterPage} from "../chapter/chapter";
import { Renderer2, ElementRef } from '@angular/core';
declare var jquery:any;
declare var $ :any;
/**
 * Generated class for the LessonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-lesson',
  templateUrl: 'lesson.html',
})
export class LessonPage {
  transform(content){

  }
  lesson_id: number;
  url: any;
  safe_url: any;
  lesson_segment;
  TOCs: any;
  infos: any;
  audio_src: any;
  audio = new Audio();
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: Http, private sanitize:DomSanitizer,
              private renderer: Renderer2, private el: ElementRef) {
    this.lesson_segment = "introduction";
    this.lesson_id = Number(navParams.get("lesson_id"));
    this.url = "http://www.tuopinpin.com/course/" + this.lesson_id +'/';
    this.safe_url = sanitize.bypassSecurityTrustResourceUrl(this.url);
    this.http.get('http://www.tuopinpin.com/course_info/' + this.lesson_id + '/')
      .toPromise().then((response) => {this.infos = response.json()[0]; this.TOCs=this.infos.TOC;
      this.audio_src = this.infos.audio; this.audio.src = this.audio_src;
      this.audio.load();});

  }

  onTap(chapter_id)
  {
    this.navCtrl.push(ChapterPage, {lesson_id: this.lesson_id, chapter_id: chapter_id});
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

  toggleTitle(){
    $("#iframe").load(function() {
      var doc = this.contentDocument || this.contentWindow.document;
      var target = $("p");
      target.innerHTML = "Found It!";
    });


  }



}
