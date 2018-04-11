import { Component } from '@angular/core';
import {CoursePage} from "../course/course";
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import {MyPage} from '../my/my';
import {HomePage} from "../home/home";
import {ProductsListViewPage} from "../products-list-view/products-list-view";
import {ProductDetailPage} from "../product-detail/product-detail";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CoursePage;
  tab3Root = ProductsListViewPage;
  tab4Root = AboutPage;
  tab5Root = ContactPage;
  tab6Root = MyPage;
  tab7Root = ProductDetailPage;
  constructor() {

  }
}
