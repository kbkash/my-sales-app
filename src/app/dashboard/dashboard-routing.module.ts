import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllSalesComponent } from './all-sales/all-sales.component';
import { DashboardComponent } from './dashboard.component';
import { ForexComponent } from './forex/forex.component';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ProductComponent } from './products/product/product.component';
// import { TestpageComponent } from './testpage/testpage.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UserComponent } from './users/user/user.component';

const routes: Routes = [
  {
    path: 'error',
    component: DashboardComponent
  },
  {
    path:'',
    component:DashboardComponent,
    children: [
      {
        path:"addUser",
        component:AddUserComponent
      },
      {
        path:"users",
        component:UserComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'forex',
        component: ForexComponent
      },
      {
        path: 'addproduct',
        component: AddProductComponent
      },
      {
        path: 'products',
        component: ProductComponent
      },
      {
        path:'allSales',
        component:AllSalesComponent
      },
      {
        path: '',
        redirectTo: 'home', //default "home"
        pathMatch: 'full'
      }
    ],  
  },
  { 
    path: '**',
    redirectTo: '',
    pathMatch: 'full' 
  },
  {
    path: 'd',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
