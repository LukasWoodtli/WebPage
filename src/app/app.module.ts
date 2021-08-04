import {NgModule, SecurityContext} from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToolbarMenuComponent } from './toolbar-menu/toolbar-menu.component';
import { StaticSiteComponent } from './pages/static-sites/static-site.component';

import {MarkdownModule} from 'ngx-markdown';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {STATIC_PAGES} from './static-pages';
import { TableOfContentsComponent } from './pages/table-of-contents/table-of-contents.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';


const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'prefix' }
];

for (const entry of STATIC_PAGES) {
  routes.push({path: entry.fileName, component: StaticSiteComponent});
}


@NgModule({
  declarations: [
    AppComponent,
    ToolbarMenuComponent,
    StaticSiteComponent,
    TableOfContentsComponent
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
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    FlexLayoutModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      sanitize: SecurityContext.NONE
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
