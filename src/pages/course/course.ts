import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { NgIf } from '@angular/common';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {LessonPage} from "../lesson/lesson";
import {AuthService} from "../../service/AuthService";
import {SettingService} from "../../service/SettingService";

@Component({
  selector: 'page-course',
  templateUrl: 'course.html'
})
export class CoursePage {

  lessons: any;
  disable_img: boolean;
  cssname: string;

  constructor(public navCtrl: NavController, public http: Http, public auth: AuthService, public settingService: SettingService) {
    //reference: https://stackoverflow.com/questions/34475523/how-to-pass-url-arguments-query-string-to-a-http-request-on-angular-2
    this.setting();

    let headers = new Headers();
    this.auth.getToken().then((value => {
      if(value)
        headers.append('Authorization', 'Token ' + value);
      this.http.get("http://www.tuopinpin.com/course_info/TOC/", {headers: headers})
        .toPromise().then((response) => {this.lessons = response.json();});}));
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
        this.cssname = "animated pulse";
    }));
  }

  onTap(id)
  {
    this.navCtrl.push(LessonPage, {lesson_id: id});
  }

}
