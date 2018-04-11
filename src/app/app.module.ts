import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {IonicStorageModule} from '@ionic/storage';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {CoursePage} from "../pages/course/course";
import {TabsPage} from '../pages/tabs/tabs';
import {AboutDetailPage} from '../pages/about-detail/about-detail';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';


import {HttpModule} from '@angular/http';
import {LessonPage} from "../pages/lesson/lesson";
import {ChapterPage} from "../pages/chapter/chapter";
import {MyPage} from "../pages/my/my";
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {ProductsListViewPage} from "../pages/products-list-view/products-list-view";
import {ProductDetailPage} from "../pages/product-detail/product-detail";
import {AuthService} from "../service/AuthService";
import {SettingService} from "../service/SettingService";
import {ProductDetailPopoverPage} from "../pages/product-detail-popover/product-detail-popover";
import {SettingPage} from "../pages/setting/setting";
import {SignupPage} from "../pages/signup/signup";
import {UelaPage} from "../pages/uela/uela";
import {MultiPickerModule} from 'ion-multi-picker';
import { CityDataProvider } from '../providers/city-data/city-data';
import {FavoritePage} from "../pages/favorite/favorite";
import {HelpPage} from "../pages/help/help";
import {PersonalCenterPage} from "../pages/personal-center/personal-center";
import {TreeViewComponent} from "../components/tree-view/tree-view";

import {ComponentsModule} from "../components/components.module";


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    CoursePage,
    TabsPage,
    AboutDetailPage,
    ChapterPage,
    LessonPage,
    MyPage,
    HomePage,
    LoginPage,
    ProductsListViewPage,
    ProductDetailPage,
    ProductDetailPopoverPage,
    SettingPage,
    SignupPage,
    UelaPage,
    FavoritePage,
    HelpPage,
    PersonalCenterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MultiPickerModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp, {}, {
      links:[
        { component: ProductsListViewPage, name: 'production_list', segment: 'production_list' },
        { component: ProductDetailPage, name: 'production_detail', segment: 'production_detail/:product_id' },
        { component: CoursePage, name: 'course', segment: 'course' },
        { component: MyPage, name: 'my', segment: 'my' },
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    CoursePage,
    TabsPage,
    AboutDetailPage,
    LessonPage,
    ChapterPage,
    MyPage,
    HomePage,
    LoginPage,
    ProductsListViewPage,
    ProductDetailPage,
    ProductDetailPopoverPage,
    SettingPage,
    SignupPage,
    UelaPage,
    FavoritePage,
    HelpPage,
    PersonalCenterPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    SettingService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CityDataProvider,
  ]
})
export class AppModule {
}
