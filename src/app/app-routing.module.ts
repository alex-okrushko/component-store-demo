import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  Demo1ExtendsComponentStoreComponent,
  Demo1ExtendsComponentStoreModule,
} from './demo1-extends-component-store/demo1-extends-component-store.component';

const routes: Routes = [
  { path: 'demo1', component: Demo1ExtendsComponentStoreComponent },
  { path: 'demo2', component: Demo1ExtendsComponentStoreComponent },
  { path: 'demo3', component: Demo1ExtendsComponentStoreComponent },
  {
    path: '',
    redirectTo: 'demo1',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), Demo1ExtendsComponentStoreModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
