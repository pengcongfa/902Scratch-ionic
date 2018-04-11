import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SignupPage} from './signup';
import {MultiPickerModule} from 'ion-multi-picker';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    MultiPickerModule,
    IonicPageModule.forChild(SignupPage),
  ],
})
export class SignupPageModule {
}
