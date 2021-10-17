import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PComponent } from './p/p.component';
import { RegisterComponent } from './register/register.component';
import { TinyUrlComponent } from './tiny-url/tiny-url.component';

const routes: Routes = [
  {
    path:"",
    component:MainComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"Register",
    component:RegisterComponent
  },
  {
    path:"shorten",
    component:TinyUrlComponent
  },
  {
    path:"p/:id",
    component:PComponent
  },
  {
    path:"p",
    component:ListComponent
  },
  {
    path:"dash-board",
    component:DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
