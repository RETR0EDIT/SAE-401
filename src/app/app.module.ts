import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { HomePopularComponent } from './component/home-popular/home-popular.component';
import { HomeAboutComponent } from './component/home-about/home-about.component';
import { LoginComponent } from './component/login/login.component';
import { SigninComponent } from './component/signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { BoxDetailsComponent } from './component/box-details/box-details.component';
import { PanierComponent } from './component/panier/panier.component';
import { ProductPageComponent } from './component/product-page/product-page.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HomePopularComponent,
    HomeAboutComponent,
    LoginComponent,
    SigninComponent,
    BoxDetailsComponent,
    PanierComponent,
    ProductPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient()
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }