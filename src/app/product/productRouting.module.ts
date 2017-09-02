import { Routes, RouterModule } from '@angular/router';
import { NgModule }            from '@angular/core';
import { ProductsComponent} from './products/products.component';
import { ProductSingleComponent} from './single/productSingle.component';
import { AdminProductsComponent} from './products/adminProducts.component';

export const routes: Routes = [
  {path: '', component: AdminProductsComponent},
  {path: 'productSingle', component: ProductSingleComponent},
  {path: 'productSingle/:id', component: ProductSingleComponent},
  {path: ':id', component: ProductSingleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRouting {}
