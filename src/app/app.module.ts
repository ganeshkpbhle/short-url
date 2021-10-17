import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PComponent } from './p/p.component';
import { RegisterComponent } from './register/register.component';
import { TinyUrlComponent } from './tiny-url/tiny-url.component';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { CardComponent } from './card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ListComponent,
    LoginComponent,
    MainComponent,
    PComponent,
    RegisterComponent,
    TinyUrlComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
