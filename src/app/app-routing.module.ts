import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AddUserComponent } from '';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeComponent } from './dashboard/home/home.component';
import { LoadingComponent } from './_helpers/loading/loading.component';
// import { AddUserComponent } from './users/user/add-user/add-user.component';
// import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:"login",
    component:AuthComponent
  },
  {
    path:'d',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path:"loading",
    component: LoadingComponent
  },
  {
    path: '',
    redirectTo: 'loading', // default Login
    pathMatch: 'full'
  },
  // {
  //   path: '**',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
