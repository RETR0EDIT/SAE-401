import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PanierComponent } from './component/panier/panier.component';

const routes: Routes = [
  { path: "home", component: HomeComponent},
  { path: "", component: PanierComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
