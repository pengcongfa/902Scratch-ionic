import { Component, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {CityDataProvider} from "../../providers/city-data/city-data";
import {Http} from "@angular/http";
import {AlertController} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {UelaPage} from "../uela/uela";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  cityColumns: any[];
  place: string;
  signupForm: FormGroup;
  status:any;
  errorMessage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder, public cityDataProvider: CityDataProvider, public http:Http,
              public alertCtrl:AlertController, public storage:Storage) {
    this.cityColumns = this.cityDataProvider.cities;
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      sex: ['', Validators.required],
      grade: ['', Validators.required],
      birthday: ['', Validators.required],

      school: ['', Validators.required],
      school_second:['',Validators.required],
      student_class: ['', Validators.required],
      student_id: ['', Validators.required],
      student_class_second:['',Validators.required],

      local_province: ['', Validators.required],
      local_city: ['', Validators.required],
      local_disrict: ['', Validators.required],

      phone_number: ['', Validators.required]
    });
  }

  registry()
  {
    if(this.signupForm.value.password1 == this.signupForm.value.password2) {
      this.signupForm.value.password=this.signupForm.value.password1;
      this.signupForm.value.local_province="";
      this.signupForm.value.grade="一年级";
      this.signupForm.value.phone_number="18811593363";

      var obj={
        birthday: this.signupForm.value.birthday,
        grade: "一年级",
        local_province: "",
        local_city: "",
        local_district: "",
        name: this.signupForm.value.name,
        password: this.signupForm.value.password1,

        phone_number: "",
        school: "",
        school_second: "",
        sex: this.signupForm.value.sex,
        student_class:"",
        student_class_second: "",
        student_id: "",
        username: this.signupForm.value.username
      }


      console.log(obj);
      this.http.post('http://www.tuopinpin.com/register/',obj)
        .toPromise().then(
        (response) => {
          this.status = response.json();
          console.log(this.status);
          if (this.status.code=="0") {
            let alertshow = this.alertCtrl.create({
              title: '注册成功',
              message: '',
              buttons: [
                {
                  text: '账号登录',
                  handler: () => {
                    var user = {
                      username: obj.username,
                      password: obj.password
                    }
                    this.navCtrl.pop();
                  }
                }
              ]
            });
            alertshow.present();
          }
        })
        .catch((reason) => {
          this.errorMessage = reason.json();
          try{
            if (this.errorMessage.username.code === "1") {
              this.showAlert('用户名重复');
              return;
            }
            if (this.errorMessage.password.code === "2") {
              this.showAlert('密码过短');
              return;
            }
          }catch(e) {
            this.showAlert('密码过短或发生了未知错误');
          }
        });
    }

    else{
      this.showAlert('两次密码输入不一致');
    }


  }

  showAlert(title){
    let alertshow = this.alertCtrl.create({
      title: title,
      message: '',
      buttons: [
        {
          text: '重新注册',
          handler: () => {
            this.cityColumns = this.cityDataProvider.cities;
            this.initForm();
          }
        }
      ]
    });
    alertshow.present();
  }


  eula(){
    this.navCtrl.push(UelaPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
