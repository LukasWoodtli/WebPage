import {NgModule, SecurityContext} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToolbarMenuComponent } from './toolbar-menu/toolbar-menu.component';
import { StaticSiteComponent } from './pages/static-sites/static-site.component';

import { MarkdownModule } from 'ngx-markdown';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarMenuComponent,
    StaticSiteComponent
  ],
  imports: [
    AppRoutingModule,
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
