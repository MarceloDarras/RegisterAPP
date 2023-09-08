import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage-angular';
import { IonicModule } from '@ionic/angular';


import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

@NgModule({
  declarations: [LoginPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  bootstrap: [LoginPage]
})
export class LoginPageModule {}
