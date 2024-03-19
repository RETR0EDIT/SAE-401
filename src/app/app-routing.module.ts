import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PanierComponent } from './component/panier/panier.component';
import { ProductPageComponent } from './component/product-page/product-page.component';
import { SigninComponent } from './component/signin/signin.component';
import { LoginComponent } from './component/login/login.component';
import { HomeAboutComponent } from './component/home-about/home-about.component';
import { BoxDetailsComponent } from './component/box-details/box-details.component';
import { ProfilComponent } from './component/profil/profil.component';
import { AdminComponent } from './component/admin/admin.component';
import { AdminAlimentComponent } from './component/admin-aliment/admin-aliment.component';
import { AdminBoxComponent } from './component/admin-box/admin-box.component';
import { AdminUserComponent } from './component/admin-user/admin-user.component';
import { AdminSaveurComponent } from './component/admin-saveur/admin-saveur.component';
import { NavAdminComponent } from './component/nav-admin/nav-admin.component';
import { AdminGuard } from './admin.guard';
import { AdminComandeComponent } from './component/admin-comande/admin-comande.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "panier", component: PanierComponent},
  { path: "product", component: ProductPageComponent},
  { path: "signin", component: SigninComponent},
  { path: "login", component: LoginComponent},
  { path: "about", component: HomeAboutComponent},
  { path: "details", component: BoxDetailsComponent},
  { path: "profil" , component: ProfilComponent},
  { path: "nav-admin", component: NavAdminComponent},
  { path: "admin", component: AdminComponent, canActivate: [AdminGuard]},
  { path: "admin/aliment", component: AdminAlimentComponent, canActivate: [AdminGuard]},
  { path: "admin/box", component: AdminBoxComponent, canActivate: [AdminGuard]},
  { path: "admin/user", component: AdminUserComponent, canActivate: [AdminGuard]},
  { path: "admin/saveur", component: AdminSaveurComponent, canActivate: [AdminGuard]},
  { path: "admin/comande", component: AdminComandeComponent, canActivate: [AdminGuard]},
  // faire 404{ path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };