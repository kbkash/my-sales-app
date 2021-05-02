import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { ProductComponent } from './products/product/product.component';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './users/user/user.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { AllSalesComponent } from './all-sales/all-sales.component';
import { ForexComponent } from './forex/forex.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    ForexComponent,  
    ProductComponent, 
    AddProductComponent,
    UserComponent,
    AddUserComponent,
    AllSalesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    GoogleChartsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
