import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './dashboard/home/home.component';

import {NgxNotificationMsgModule} from 'ngx-notification-msg'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';
import { LoadingComponent } from './_helpers/loading/loading.component';
// import { AddUserComponent } from './add-user/add-user.component';
// import { UserComponent } from './users/user/user.component';
// import { AddUserComponent } from './users/add-user/add-user.component';
// import { AddUserComponent } from './users/user/add-user/add-user.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoadingComponent,
    // AddUserComponent,
    // UserComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxNotificationMsgModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
