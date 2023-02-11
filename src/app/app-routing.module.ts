import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../app/website/components/layout/layout.component';
import { HomeComponent } from '../app/website/pages/home/home.component';
import { NotFoundComponent } from '../app/website/pages/not-found/not-found.component';
import { CategoryComponent } from '../app/website/pages/category/category.component';
import { MyCartComponent } from '../app/website/pages/my-cart/my-cart.component';
import { LoginComponent } from '../app/website/pages/login/login.component';
import { RegisterComponent } from '../app/website/pages/register/register.component';
import { RecoveryComponent } from '../app/website/pages/recovery/recovery.component';
import { ProfileComponent } from '../app/website/pages/profile/profile.component';
import { ProductDetailComponent } from '../app/website/pages/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'category/:myId',
        component: CategoryComponent,
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'my-cart',
        component: MyCartComponent,
      },
      {
        path: 'not-found',
        component: NotFoundComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'recovery',
        component: RecoveryComponent,
      },
    ],
  },
  {
    path: 'cms',
    loadChildren: () => import('./cms/cms.module').then((m) => m.CmsModule),
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
