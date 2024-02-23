import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PanierComponent } from './component/panier/panier.component';
import { ProductPageComponent } from './component/product-page/product-page.component';
import { SigninComponent } from './component/signin/signin.component';
import { LoginComponent } from './component/login/login.component';
import { HomeAboutComponent } from './component/home-about/home-about.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "panier", component: PanierComponent},
  { path: "product", component: ProductPageComponent},
  { path: "signin", component: SigninComponent},
  { path: "login", component: LoginComponent},
  { path: "about", component: HomeAboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
