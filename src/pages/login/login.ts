import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder,FormGroup } from '@angular/forms';
import {Http} from '@angular/http';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import {SignupPage} from "../signup/signup";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
              public http: Http, public alertCtrl : AlertController, public storage: Storage) {
    this.initForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.http.post('http://www.tuopinpin.com/login/', this.loginForm.value)
      .toPromise().then(
        (response) => {
          this.storage.set('code', response.json().token);
          this.storage.set('username', this.loginForm.value.username);
          this.presentAlert("登陆成功");
          this.navCtrl.pop().then(()=>{this.navCtrl.setRoot(this.navCtrl.getActive().component)});
        })
      .catch((reason) => {
        this.errorMessage = reason.json();
        try{
          if (this.errorMessage.username.code === "2") {
            this.presentAlert("用户名或密码不正确", "您输入的用户名或密码不正确，请检查后再试！");
            return;
          }
        }catch(e) {
          this.presentAlert("发生了未知错误");
        }
      });
  }

  forgetPwd()
  {
    this.presentAlert("功能完善中");
  }

  register()
  {
    this.navCtrl.push(SignupPage);
  }

  presentAlert(title, message="") {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
