import {NgModule, SecurityContext} from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToolbarMenuComponent } from './toolbar-menu/toolbar-menu.component';
import { StaticSiteComponent } from './pages/static-sites/static-site.component';

import {MarkdownModule, MarkdownService} from 'ngx-markdown';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {STATIC_PAGES} from './static-pages';


const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' }
];

for (const entry of STATIC_PAGES) {
  routes.push({path: entry.fileName, component: StaticSiteComponent});
}


@NgModule({
  declarations: [
    AppComponent,
    ToolbarMenuComponent,
    StaticSiteComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatToolbarModule,
    HttpClientModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      sanitize: SecurityContext.NONE
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
