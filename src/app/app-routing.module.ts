import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { ProductComponent } from './module/product/product.component';


const routes: Routes = [
  { path : '', component : ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ProductComponent]
