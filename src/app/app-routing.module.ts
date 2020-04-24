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
import {
  Demo3WithServiceProvidedComponent,
  Demo3WithServiceProvidedModule,
} from './demo3-with-service-provided/demo3-with-service-provided.component';
import {
  Demo4WithIdModule,
  Demo4WithIdComponent,
} from './demo4-with-id/demo4-with-id.component';
import {
  Demo5AuthorComponent,
  Demo5AuthorModule,
} from './demo5-author/demo5-author.component';
import {
  Demo6AuthorsComponent,
  Demo6AuthorsModule,
} from './demo6-authors/demo6-authors.component';
import {
  Demo7WithNavComponent,
  Demo7WithNavModule,
} from './demo7-with-nav/demo7-with-nav.component';
import {
  Demo8WithObservableComponent,
  Demo8WithObservableModule,
} from './demo8-with-observable/demo8-with-observable.component';

const routes: Routes = [
  { path: 'demo1', component: Demo1ExtendsComponentStoreComponent },
  { path: 'demo2', component: Demo2WithServiceComponent },
  { path: 'demo3', component: Demo3WithServiceProvidedComponent },
  { path: 'demo4', component: Demo4WithIdComponent },
  { path: 'demo5', component: Demo5AuthorComponent },
  { path: 'demo6', component: Demo6AuthorsComponent },
  { path: 'demo7/:bookId', component: Demo7WithNavComponent },
  { path: 'demo8', component: Demo8WithObservableComponent },
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
    Demo3WithServiceProvidedModule,
    Demo4WithIdModule,
    Demo5AuthorModule,
    Demo6AuthorsModule,
    Demo7WithNavModule,
    Demo8WithObservableModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
