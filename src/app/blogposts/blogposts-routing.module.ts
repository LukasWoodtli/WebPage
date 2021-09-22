import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BlogpostsComponent} from './blogposts.component';

const routes: Routes = [
  {
    path: ':title',
    component: BlogpostsComponent,
  },
  {
    path: '**',
    component: BlogpostsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogpostsRoutingModule {}

