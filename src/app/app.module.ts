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
import { BoxDetailsComponent } from './component/box-details/box-details.component';
import { PanierComponent } from './component/panier/panier.component';
import { ProductPageComponent } from './component/product-page/product-page.component';
import { FormsModule } from '@angular/forms';
import { ProfilComponent } from './component/profil/profil.component';
import { CartService } from './cart.service';
import { SharedService } from './shared.service';
import { AdminComponent } from './component/admin/admin.component';
import { AdminBoxComponent } from './component/admin-box/admin-box.component';
import { AdminUserComponent } from './component/admin-user/admin-user.component';
import { AdminAlimentComponent } from './component/admin-aliment/admin-aliment.component';
import { AdminSaveurComponent } from './component/admin-saveur/admin-saveur.component';
import { NavAdminComponent } from './component/nav-admin/nav-admin.component';

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
    ProductPageComponent,
    ProfilComponent,
    AdminComponent,
    AdminBoxComponent,
    AdminUserComponent,
    AdminAlimentComponent,
    AdminSaveurComponent,
    NavAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    CartService,
    SharedService,    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }