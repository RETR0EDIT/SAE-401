import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PanierComponent } from './component/panier/panier.component';
import { ProductPageComponent } from './component/product-page/product-page.component';

const routes: Routes = [
  { path: "home", component: HomeComponent},
  { path: "panier", component: PanierComponent},
  { path: "", component: ProductPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
