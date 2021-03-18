import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StaticSiteComponent} from "./pages/static-sites/static-site.component";
import {StaticPages} from './static-pages';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' }
];

for (const entry of StaticPages) {
  routes.push({path: entry.file_name, component: StaticSiteComponent});
}

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 25], // cool option, or ideal option when you have a fixed header on top.
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
