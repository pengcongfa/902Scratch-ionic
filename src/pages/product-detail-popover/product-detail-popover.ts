import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {AlertController} from "ionic-angular";
import {ToastController} from "ionic-angular";

declare var Wechat: any;// 此处声明plugin.xml中clobbers对应的值
declare var WeiboSDK: any;
declare var QQSDK: any;

/**
 * Generated class for the ProductDetailPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail-popover',
  templateUrl: 'product-detail-popover.html',
})
export class ProductDetailPopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public alertCtrl: AlertController, public toastCtrl:ToastController) {
    console.log(this.navParams.data);
    console.log(this.navParams.data.name);
  }


  wechatFriendShare() {
    Wechat.isInstalled(installed => {
      if (installed) {
        // todo when installed
      } else {
        alert("未安装微信，请先安装微信后再分享")// todo when uninstalled
      }
    }, reason => {
      alert("Failed: " + reason);// todo when uninstalled
    });
    Wechat.share({
      message: {
        title: this.navParams.data.name,
        description: this.navParams.data.description,
        thumb: this.navParams.data.image,
        media: {
          type: Wechat.Type.WEBPAGE,
          webpageUrl: "http://m.tuopinpin.com/#production_detail/" + this.navParams.data.id
        }
      },
      scene: Wechat.Scene.SESSION   // share to friend
    }, function () {
      alert("Success");
    }, function (reason) {
      alert("Failed: " + reason);
    });

  }


  wechatMomentsShare() {
    Wechat.isInstalled(installed => {
      if (installed) {
        // todo when installed
      } else {
        alert("未安装微信，请先安装微信后再分享")// todo when uninstalled
      }
    }, reason => {
      alert("Failed: " + reason);// todo when uninstalled
    });

    Wechat.share({
      message: {
        title: this.navParams.data.name,
        description: this.navParams.data.description,
        thumb: this.navParams.data.image,
        media: {
          type: Wechat.Type.WEBPAGE,
          webpageUrl: "http://m.tuopinpin.com/#production_detail/" + this.navParams.data.id
        }
      },
      scene: Wechat.Scene.TIMELINE   // share to Timeline
    }, function () {
      alert("Success");
    }, function (reason) {
      alert("Failed: " + reason);
    });

  }

  weiboShare() {
    WeiboSDK.checkClientInstalled(function () {
      //alert('client is installed');
    }, function () {
      alert('weibo is not installed');
    });

    var args: any = {};
    args.title = this.navParams.data.name;
    args.image = this.navParams.data.image;
    args.description = this.navParams.data.description;
    args.url = "http://m.tuopinpin.com/#production_detail/" + this.navParams.data.id;
    WeiboSDK.shareToWeibo(function () {
      alert('分享成功！');
    }, function (reason) {
      alert('分享失败' + reason);
    }, args)
  }

  qqNewsShare(index) {
    var args: any = {};
    if (index == 0) {
      args.scene  = QQSDK.Scene.QQ;
    } else {
      args.scene  = QQSDK.Scene.QQZone;
    }
    args.client = QQSDK.ClientType.QQ;//QQSDK.ClientType.QQ,QQSDK.ClientType.TIM;
    args.url = "http://m.tuopinpin.com/#production_detail/" + this.navParams.data.id;
    args.title = this.navParams.data.name;
    args.image = this.navParams.data.image;
    args.description = this.navParams.data.description;
    QQSDK.shareNews(function () {
      alert('分享成功')
    }, function (reason) {
      alert('失败：' + reason)
    }, args);

  }

  addToMyFavorite(){

  }

  report(){
    let reportAlert=this.alertCtrl.create({
      title:'举报',
      message:'作品:['+this.navParams.data.name+']含有不良内容',
      buttons:[
        {
          text:'cancel',
          handler:()=>{

          }
        },
        {
          text:'ok',
          handler:()=>{
            let toast=this.toastCtrl.create({
              message:'举报成功，平台将会在24小时之内给出回复',
              duration:3000,
              position:'middle'
            });
            toast.present();
          }
        }
      ]
    });
    reportAlert.present();
    this.viewCtrl.dismiss();
  }

  contact(){
    let contactAlert=this.alertCtrl.create({
      title:'联系客服',
      message:'请致电:010-62282195 '+'我们将第一时间为你服务',
      buttons:[
        {
          text:'ok',
          handler:()=>{}

        }
      ]
    });
    contactAlert.present();
    this.viewCtrl.dismiss();
  }



  close() {
    this.viewCtrl.dismiss();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPopoverPage');
  }

}
