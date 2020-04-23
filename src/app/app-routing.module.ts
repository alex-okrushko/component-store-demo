import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  Demo1ExtendsComponentStoreComponent,
  Demo1ExtendsComponentStoreModule,
} from './demo1-extends-component-store/demo1-extends-component-store.component';
import {
  Demo2WithServiceComponent,
  Demo2WithServiceModule,
} from './demo2-with-service/demo2-with-service.component';
import { ChooserComponent } from './chooser.component';

const routes: Routes = [
  { path: 'demo1', component: Demo1ExtendsComponentStoreComponent },
  { path: 'demo2', component: Demo2WithServiceComponent },
  { path: 'demo3', component: Demo1ExtendsComponentStoreComponent },
  { path: 'demo4', component: Demo1ExtendsComponentStoreComponent },
  { path: 'demo5', component: Demo1ExtendsComponentStoreComponent },
  { path: 'demo6', component: Demo1ExtendsComponentStoreComponent },
  {
    path: 'choose',
    component: ChooserComponent,
  },
  {
    path: '',
    redirectTo: 'choose',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [ChooserComponent],
  imports: [
    RouterModule.forRoot(routes),
    Demo1ExtendsComponentStoreModule,
    Demo2WithServiceModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
